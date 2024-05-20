'use client'
import React from 'react'
import styles from './navbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import usePathname from 'next/navigation'
import { VscGear } from "react-icons/vsc";
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/auth/loginSlice'
import { deleteCookie } from 'cookies-next';
import { SidebarItems } from './SidebarItems'
import { GiExitDoor } from "react-icons/gi";
import capitalize from 'capitalize'


export const Sidebar = ({ estadoSidebar }) => {
  
    const { Nom_User, Ape_User, Ema_User } = JSON.parse(localStorage.getItem('name'));

    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        deleteCookie('sessionToken')
        localStorage.removeItem('sessionToken')
        localStorage.removeItem('name')
        return router.push('/auth/login')

    }

    return (
        <>
            {/* {navbar-computadores} */}
            <div className={`${styles.NavbarComputers} bg-[#00324D] fixed z-20 h-screen b-0  min-h-screen top-0 left-0 flex text-white`}>

                <div className={`${styles.NavbarInfo} w-full  h-full flex flex-col justify-between `}>
                    <div className='w-full h-1/3 flex flex-col '>
                        <div className='flex w-full items-center justify-center border-[#2d4755] border-b-1 py-4'>
                            <Image priority={true} src="/logo-senalearn-(white).png" alt="Logo de SENA Learn" width={30} height={30} />
                            <span className="text-xl mx-2 text-center">SENALEARN</span>
                        </div>
                        <div id="logo" className=" flex flex-col mt-10 justify-center items-center my-2">
                            <Link href="/">
                                <Image width={80} height={80} className="rounded-full" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="logo.png" />
                            </Link>
                            <span>{capitalize(Nom_User) + " " + capitalize(Ape_User)}</span>
                            <span className=' text-sm text-[#707C94]'>{Ema_User}</span>
                        </div>
                    </div>

                    {/* {items de navbar} */}
                    <SidebarItems />

                    <div className='flex w-full justify-start items-center px-3 pb-10'>
                        <button className='w-full flex items-center' onClick={handleLogout}>
                            <GiExitDoor className='text-white mx-2 text-3xl' />
                            <span className="text-sm text-white">Cerrar sesion</span>
                        </button>
                    </div>
                </div>


            </div>

            {/* {navbar-celulares} */}

            <div className={`${styles.NavbarCelulares} ${estadoSidebar == true ? 'opacity-100 z-20' : 'opacity-0 z-0'} h-screen fixed  left-0 top-0 bg-[#00324D] transition-all ease-in-out delay-150`}>
                <div className={`${styles.NavbarInfo} w-full h-full flex flex-col `}>
                    <div className='w-full h-16 flex flex-col py-6 border-b-2 border-[#55768875]  '>
                        <div className='flex w-full h-full items-center justify-center '>
                            <Image priority={true} src="/logo-senalearn-(white).png" alt="Logo de SENA Learn" width={30} height={30} />
                        </div>
                    </div>
                    <div className='w-full flex flex-col h-full justify-between items-center'>
                        {/* {items celulares} */}
                        <SidebarItems />
                        <div className='flex w-full justify-center items-center h-16 '>
                            <Link href={'/admin/dashboard'}>
                                <VscGear className=" text-white w-full text-4xl" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
