'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../../features/auth/loginSlice'
import { getCookie, deleteCookie } from 'cookies-next';
import { Bell, Bolt, ChevronDown, LogOutIcon, Mail } from 'lucide-react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

export const NavHome = () => {
  const router = useRouter()
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    deleteCookie('sessionToken')
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('name')
    return router.push('/auth/login')
  }
  const handleSubmitTwo = () => {
    dispatch(login())
    console.log(authState)
  }


  return (
    <Navbar isBlurred={false} className='p-3 bg-azulSena'>
      <NavbarBrand >
        <Link href='/' >
          <Image priority={true} src={'/logo-senalearn-(white).png'} alt='Logo de SENA Learn' width={50} height={50} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link className='font-medium text-white hover:bg-[#0b212e] transition-all duration-200 rounded-lg' isBlock color="foreground" href="/courses/explore">
            Explorar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='font-medium text-white hover:bg-[#0b212e] transition-all duration-200 rounded-lg' isBlock color="foreground" href="#">
            FAQS
          </Link>
        </NavbarItem>
      </NavbarContent>
      {authState.isAuthenticated ?
        <NavbarContent as="div" justify="end">
          <button><Bell color='white' /></button>
          <Link href='/messages'><Mail color='white' /></Link>
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
              <DropdownItem key="settings" href='/instructors/profile'><div className='flex items-center gap-1'><Bolt size={18} /> Configuración</div></DropdownItem>
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
  )
}
