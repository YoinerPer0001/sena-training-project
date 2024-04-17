'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../features/auth/loginSlice'
import { getCookie, deleteCookie } from 'cookies-next';
import { ChevronDown } from 'lucide-react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

export const NavHome = () => {
  const router = useRouter()
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    deleteCookie('prueba')
    return router.push('/auth/login')
  }
  const handleSubmitTwo = () => {
    dispatch(login())
    console.log(authState)
  }


  return (
    <Navbar isBlurred={false} isBordered className='p-2'>
      <NavbarBrand >
        <Image src={'/logo-naranja.svg'} alt='Logo de SENA Learn' width={50} height={50} />
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link className='font-semibold' isBlock color="foreground" href="/courses/explore">
            Explorar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='font-semibold' isBlock color="foreground" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='font-semibold' isBlock color="foreground" href="#">
            FAQS
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
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
              <ChevronDown size={20} color='#666' />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings" href='/admin/profile'>Configuración</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
