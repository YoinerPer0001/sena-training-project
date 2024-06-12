'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/loginSlice';
import { deleteCookie, getCookie } from 'cookies-next';
import { SidebarItems } from './SidebarItems';
import { Bolt, LogOut } from 'lucide-react';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';

export const Sidebar = ({ estadoSidebar }) => {
  const authState = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = authState.user

  useEffect(() => {
      setLoading(false);
  }, [authState]);
 
  const logoutToken = async () => {
    try {
      const sessionToken = getCookie('sessionToken');

      await fetch('http://localhost:3000/api/v1/user/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionToken ? `Bearer ${sessionToken}` : '',
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      deleteCookie('sessionToken');
      await logoutToken();
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('name');
      }
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    loading ? <Spinner /> : (
      <>
        <div className={`${styles.NavbarComputers} bg-azulSena border-verdeSena fixed z-20 h-screen min-h-screen top-0 left-0 flex text-white justify-between flex-col`}>
          <div className={`${styles.NavbarInfo} w-full h-full flex flex-col justify-start`}>
            <div className='w-full h-1/3 flex flex-col mb-20'>
              <div className='flex w-full items-center justify-center py-4'>
                <Image priority src={"/logo-senalearn-(white).png"} alt="Logo de SENA Learn" width={30} height={30} />
                <span className="text-xl mx-2 text-center font-medium">SENALEARN</span>
              </div>
              <div id="logo" className="flex flex-col mt-10 justify-center items-center">
                <Link href="/">
                  <Image width={80} height={80} className="rounded-full" src={user?.Fot_User} alt="logo" />
                </Link>
                <div className='flex flex-col gap-1 mt-2'>
                  <span className='leading-3 text-center font-semibold'>
                    {user?.Nom_User} {user?.Ape_User}
                  </span>
                  <span className='leading-3 text-sm text-gray-400'>{user.Ema_User}</span>
                </div>
              </div>
            </div>
            <SidebarItems />
          </div>
          <div className='flex w-full justify-start items-center px-3 pb-10'>
            <button className='w-full flex items-center hover:bg-red-100 p-2 rounded-lg hover:text-red-500 font-medium transition-all duration-150' onClick={handleLogout}>
              <LogOut className='mx-2' />
              <span className="text-base">Cerrar sesión</span>
            </button>
          </div>
        </div>
        <div className={`${styles.NavbarCelulares} ${estadoSidebar ? 'opacity-100 z-20' : 'opacity-0 z-0'} h-screen fixed left-0 top-0 bg-[#00324D] transition-all ease-in-out delay-150`}>
          <div className={`${styles.NavbarInfo} w-full h-full flex flex-col`}>
            <div className='w-full h-16 flex flex-col py-6'>
              <div className='flex w-full h-full items-center justify-center'>
                <Image priority src={"/logo-senalearn-(white).png"} alt="Logo de SENA Learn" width={30} height={30} />
              </div>
            </div>
            <div className='w-full flex flex-col h-full justify-between items-center'>
              <SidebarItems />
              <div className='flex w-full justify-center items-center h-16'>
                <Link href={'/admin/dashboard'}>
                  <Bolt className="text-white w-full text-4xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
