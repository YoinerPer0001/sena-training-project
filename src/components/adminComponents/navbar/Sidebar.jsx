'use client'
import React from 'react'
import styles from './navbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/auth/loginSlice'
import { deleteCookie } from 'cookies-next';
import { SidebarItems } from './SidebarItems'
import capitalize from 'capitalize'
import { Bolt, LogOut } from 'lucide-react'


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
            <div className={`${styles.NavbarComputers} bg-azulSena fixed z-20 h-screen b-0  min-h-screen top-0 left-0 flex text-white justify-between flex-col`}>
                <div className={`${styles.NavbarInfo} w-full  h-full flex flex-col justify-start`}>
                    <div className='w-full h-1/3 flex flex-col '>
                        <div className='flex w-full items-center justify-center py-4'>
                            <Image priority={true} src="/logo-senalearn-(white).png" alt="Logo de SENA Learn" width={30} height={30} />
                            <span className="text-xl mx-2 text-center font-medium">SENALEARN</span>
                        </div>
                        <div id="logo" className=" flex flex-col mt-10 justify-center items-center">
                            <Link href="/">
                                <Image width={80} height={80} className="rounded-full" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="logo.png" />
                            </Link>
                            <div className='flex flex-col gap-1 mt-2'>
                                <span className='leading-3 font-semibold'>{capitalize(Nom_User) + " " + capitalize(Ape_User)}</span>
                                <span className='leading-3 text-sm text-gray-400'>{Ema_User}</span>
                            </div>
                        </div>
                    </div>

                    {/* {items de navbar} */}
                    <SidebarItems />


                </div>

                <div className='flex w-full justify-start items-center px-3 pb-10'>
                    <button className='w-full flex items-center hover:bg-red-100 p-2 rounded-lg hover:text-red-500 font-medium transition-all duration-150' onClick={handleLogout}>
                        <LogOut className='mx-2' />
                        <span className="text-base">Cerrar sesion</span>
                    </button>
                </div>


            </div>

            {/* {navbar-celulares} */}

            <div className={`${styles.NavbarCelulares} ${estadoSidebar == true ? 'opacity-100 z-20' : 'opacity-0 z-0'} h-screen fixed  left-0 top-0 bg-[#00324D] transition-all ease-in-out delay-150`}>
                <div className={`${styles.NavbarInfo} w-full h-full flex flex-col `}>
                    <div className='w-full h-16 flex flex-col py-6'>
                        <div className='flex w-full h-full items-center justify-center '>
                            <Image priority={true} src="/logo-senalearn-(white).png" alt="Logo de SENA Learn" width={30} height={30} />
                        </div>
                    </div>
                    <div className='w-full flex flex-col h-full justify-between items-center'>
                        {/* {items celulares} */}
                        <SidebarItems />
                        <div className='flex w-full justify-center items-center h-16 '>
                            <Link href={'/admin/dashboard'}>
                                <Bolt className=" text-white w-full text-4xl" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
