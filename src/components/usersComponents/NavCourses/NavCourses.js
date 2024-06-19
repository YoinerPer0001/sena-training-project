'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { useApp } from '@/features/AppContext/AppContext';
import { login, logout } from '../../../features/auth/loginSlice'
import { getCookie, deleteCookie } from 'cookies-next';
import { Search, Menu, ChevronDown, LogOut, Bolt, User2, GraduationCap, LogOutIcon, Bell } from 'lucide-react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

export const NavCourses = () => {
  const router = useRouter()
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const user = authState.user
  console.log(user)

  const { searchTerm, setSearchTerm } = useApp();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    deleteCookie('prueba')
    return router.push('/auth/login')
  }
  const handleSubmitTwo = () => {
    dispatch(login())
    console.log(authState)
  }

  const logout = () => {
    deleteCookie('sessionToken');

    // Verificar si localStorage está definido
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem('sessionToken');
        console.log("Token de sesión eliminado de localStorage.");
      } catch (e) {
        console.error("Se produjo un error al intentar acceder a localStorage:", e);
      }
    } else {
      console.warn("localStorage no está definido en este entorno.");
    }

    return router.push('/auth/login');
  };


  return (
    <Navbar className='p-3 bg-[#00324D]' isBlurred={false} isBordered>
      <NavbarBrand className='hidden md:flex'>
        <a href="/">
          <Image src={'/logo-senalearn-(white).png'} alt='Logo de SENA Learn' width={50} height={50} />
        </a>
      </NavbarBrand>
      <NavbarContent className="flex md:hidden gap-4">
        <NavbarItem className='flex items-center'>
          <Menu color='#fff' />
        </NavbarItem>
      </NavbarContent>
      <NavbarBrand className='flex md:hidden items-center justify-center'>
        <Image src={'/logo-senalearn-(white).png'} alt='Logo de SENA Learn' width={40} height={40} />
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4">
        <NavbarItem className='flex items-center'>
        <input
            type="text"
            placeholder='Buscar un curso'
            value={searchTerm}
            onChange={handleSearchChange}
            className='w-[350px] lg:w-[600px] py-2 px-2 outline-none border-r-0 rounded-l-lg'
          />
          <button className='p-2 bg-[#6fccff] rounded-r-lg text-xs hover:bg-black hover:border-black transition-all duration-200'>
            <Search color='#00324D' />
          </button>
        </NavbarItem>
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
  )
}
