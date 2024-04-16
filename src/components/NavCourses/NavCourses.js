'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../features/auth/loginSlice'
import { getCookie, deleteCookie } from 'cookies-next';
import { Search, Menu } from 'lucide-react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

export const NavCourses = () => {
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
    <Navbar className='p-2' isBlurred={false} isBordered>
      <NavbarBrand className='hidden md:flex'>
        <Image src={'/logo-naranja.svg'} alt='Logo de SENA Learn' width={50} height={50} />
      </NavbarBrand>
      <NavbarContent className="flex md:hidden gap-4">
        <NavbarItem className='flex items-center'>
          <Menu />
        </NavbarItem>
      </NavbarContent>
      <NavbarBrand className='flex md:hidden items-center justify-center'>
        <Image src={'/logo-naranja.svg'} alt='Logo de SENA Learn' width={40} height={40} />
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4">
        <NavbarItem className='flex items-center'>
          <input type="text" placeholder='Buscar un curso' className='w-[350px] lg:w-[600px] py-2 px-2 outline-none border-1 border-r-0 border-gray-400 rounded-l-lg' />
          <button className='p-2 bg-[#00324D] rounded-r-lg border-1 border-[#00324D] text-xs hover:bg-black hover:border-black transition-all duration-200'>
            <Search color='#6fccff'/>
          </button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              // color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://res.cloudinary.com/dla5djfdc/image/upload/v1712821257/blank-avatar-photo-place-holder-600nw-1095249842_a6kf0c.webp"
            />
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
