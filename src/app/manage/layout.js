'use client'
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button, DropdownItem, DropdownMenu, Avatar, DropdownTrigger, Dropdown } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Bell, Bolt, ChevronDown, GraduationCap, LogOutIcon, User2 } from "lucide-react";

export default function AccountLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname()
    const authState = useSelector(state => state.auth)
    const user = authState.user

    const handleLogout = () => {
        dispatch(logout());
        deleteCookie('sessionToken');
    
        // Verificar si localStorage está definido
        if (typeof localStorage !== 'undefined') {
          try {
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('name');
            console.log("Elementos eliminados de localStorage.");
          } catch (e) {
            console.error("Se produjo un error al intentar acceder a localStorage:", e);
          }
        } else {
          console.warn("localStorage no está definido en este entorno.");
        }
    
        return router.push('/auth/login');
      };

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <>
            <main className='h-screen overflow-hidden flex flex-col'>
                <Navbar
                    isBordered
                    isMenuOpen={isMenuOpen}
                    onMenuOpenChange={setIsMenuOpen}
                    className="bg-azulSena text-white p-2"
                    position="static"
                >
                    <NavbarContent className="sm:hidden" justify="start">
                        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                    </NavbarContent>

                    <NavbarContent className="sm:hidden pr-3" justify="center">
                        <Link href={'/'}>
                            <Image priority={true} src={'/logo-senalearn-(white).png'} width={50} height={50} alt="Logo SENA Learn" />
                        </Link>
                    </NavbarContent>

                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <Link href={'/'}>
                            <Image priority={true} src={'/logo-senalearn-(white).png'} width={50} height={50} alt="Logo SENA Learn" />
                        </Link>
                        {pathname === '/manage/create' ? <NavbarItem>
                            <div className="text-white font-semibold text-lg">
                                Crear curso nuevo
                            </div>
                        </NavbarItem> : ''}
                    </NavbarContent>

                    {authState.isAuthenticated ?
                        <NavbarContent as="div" justify="end">
                            <button><Bell color='white' /></button>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            // color="secondary"
                                            name="Jason Hughes"
                                            size="sm"
                                            src="https://res.cloudinary.com/dla5djfdc/image/upload/v1712821257/blank-avatar-photo-place-holder-600nw-1095249842_a6kf0c.webp"
                                        />
                                        <ChevronDown size={20} color='#fff' />
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="settings" href={'/profile'}>
                                        <div className='flex items-center gap-1'>
                                            <User2 size={18} /> Mi cuenta
                                        </div>
                                    </DropdownItem>
                                    {user.Id_Rol_FK == 2 &&
                                        <DropdownItem key="settings" href={'/instructors/content'} color='primary'>
                                            <div className='flex items-center gap-1'>
                                                <GraduationCap size={18} /> Instructores
                                            </div>
                                        </DropdownItem>}
                                    {user.Id_Rol_FK == 1 &&
                                        <DropdownItem key="settings" href={'/admin/dashboard'} color='primary'>
                                            <div className='flex items-center gap-1'>
                                                <Bolt size={18} /> Administrar
                                            </div>
                                        </DropdownItem>}
                                    <DropdownItem key="logout" color="danger">
                                        <div onClick={handleLogout} className='flex items-center gap-1'>
                                            <LogOutIcon size={18} />Cerrar sesión
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarContent> :
                        <NavbarContent as="div" justify="end">
                            <NavbarItem>
                                <Link className='font-medium text-white hover:bg-[#0b212e] transition-all duration-200 rounded-lg' isBlock color="foreground" href="/auth/login">
                                    Iniciar sesión
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link className='font-medium text-white hover:bg-[#0b212e] transition-all duration-200 rounded-lg' isBlock color="foreground" href="/auth/register">
                                    Registrarme
                                </Link>
                            </NavbarItem>
                        </NavbarContent>}
                </Navbar>
                <section className="w-full h-full p-4 rounded-lg box-border overflow-auto">
                    {children}
                </section>
            </main>
        </>
    );
}