'use client'
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation";

export default function AccountLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname()

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


                    {pathname !== '/manage/create' ?
                        <NavbarContent justify="end">
                            <NavbarItem className="hidden lg:flex">
                                <button className="bg-azulSecundarioSena p-2 rounded-lg text-black hover:text-white font-semibold hover:bg-black transition-all duration-150">Enviar a revisión</button>
                            </NavbarItem>
                        </NavbarContent> : ''}


                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    className="w-full"
                                    color={
                                        index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                                    }
                                    href="#"
                                    size="lg"
                                >
                                    {item}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </Navbar>
                <section className="w-full h-full p-4 rounded-lg box-border overflow-auto">
                    {children}
                </section>
            </main>
        </>
    );
}