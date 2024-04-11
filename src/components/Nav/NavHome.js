'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './NavHome.module.scss'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {useSelector, useDispatch} from 'react-redux'
import {login, logout} from '../../features/auth/loginSlice'
import { MdPerson } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale, HomePersonal} from "./Icons";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import { getCookie, deleteCookie } from 'cookies-next';


export const NavHome = () => {
  const router = useRouter()
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(logout())
    deleteCookie('prueba')
    return router.push('/auth/login')
  }
  const handleSubmitTwo = () => {
    dispatch(login())
    console.log(authState)
  }


  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <header className={styles.header}>
      <div className={styles.message_header}>
        <p>Desarrolla tus Talentos a Gran Escala | Descubre por qué miles confían en nosotros en todo el mundo</p>
      </div>
      <Navbar>
        <NavbarBrand>
          <Image alt="Logo SENA Learn" src="/logo-senalearn.png" width={50} height={50} />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Dropdown>
            <li className='text-base font-medium'>
              <DropdownTrigger>
                <button onClick={handleSubmit}>
                  Explorar
                </button>
              </DropdownTrigger>
            </li>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
                startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
                startContent={icons.flash}
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
                startContent={icons.server}
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
                startContent={icons.user}
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <li className='text-base font-medium'>
            <button href="#" aria-current="page" onClick={handleSubmitTwo}>
              Cursos
            </button>
          </li>
          <li className='text-base font-medium'>
            <Link color="foreground" href="#">
              Categorias
            </Link>
          </li>
        </NavbarContent>
        <NavbarContent justify="end">
        {authState.isAuthenticated ?
        <Dropdown>
            <li>
              <DropdownTrigger>
                <button className='text-2xl flex items-center bg-[#00324D] text-white rounded-lg p-1'>
                  <MdPerson />
                  <MdKeyboardArrowDown />
                </button>
              </DropdownTrigger>
            </li>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-2",
              }}
            >
              <DropdownItem
                key="my account"
                startContent={icons.scale}
                href='/account/content'
              >
                Mi cuenta
              </DropdownItem>
              <DropdownItem
                key="log out"
                startContent={icons.user}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          :
          <li className='text-base font-medium flex gap-2 items-center'>
            <Link href="/auth/login" aria-current="page">
              Log In
            </Link>
            |
            <Link href="/auth/register" aria-current="page" onClick={handleSubmit}>
              Sign Up
            </Link>
          </li>
          }
        </NavbarContent>
    </Navbar>
    </header>
  )
}
