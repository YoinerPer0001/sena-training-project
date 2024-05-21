'use client'
import { useState } from "react";
import { Sidebar } from "@/components/adminComponents/navbar/Sidebar";
import { usePathname } from "next/navigation";
import { Bell, Menu  } from "lucide-react";
import Image from 'next/image'


export default function AdminLayout({ children }) {
  const [status, setstatus] = useState(false)

  const pathname = usePathname() ;

  return (
    <div className="w-full h-screen flex min-h-screen">

      {/* Sidebar */}
      <Sidebar estadoSidebar={status} />
      
      <div className="flex flex-col 2xl:pl-72 lg:md:xl:pl-52 sm:pl-0 pt-16 h-full w-full overflow-auto">
        {/* Navbar */}
        <div className="w-screen h-16 bg-white 2xl:pl-72 lg:md:xl:pl-52 sm:pl-0 fixed top-0 left-0 z-10 flex justify-between flex-grow items-center">
          {/* Aquí va el contenido del Navbar */}
          <div className="pl-2 w-2/3 h-full flex justify-start items-center">
            <div className={`${status == true ? ' pl-16 w-24': 'pl-0 w-10'} lg:md:xl:hidden h-full flex items-center transition-all ease-in-out delay-75`}>
              <button onClick={()=>setstatus(!status)}>
                <Menu className="text-3xl" />
              </button>
            </div>
            <div className="text-center flex w-2/3 h-full items-center">
              {pathname === '/admin/courses' ?
               <span className="text-3xl mx-3 lg:md:xl:block hidden"> Gestión de Cursos</span>
               : pathname === '/admin/users' ? <span className="text-3xl mx-3 lg:md:xl:block hidden"> Gestión de usuarios</span>
               : pathname === '/admin/dashboard' ? <span className="text-3xl mx-3 lg:md:xl:block hidden">Panel</span> 
               : ''
              }
            </div>
          </div>
          <div className=" lg:md:xl:w-1/6 sm:w-1/3  h-full  flex flex-row-reverse py-3 justify-center items-center">
            <Bell className="text-2xl mx-3"/>
            <Image priority width={50} height={50} className="rounded-full lg:md:xl:hidden sm:block" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="logo.png" />
          </div>

        </div>
        <div className="flex-grow bg-[#ffffff]">
          {children}
        </div>
      </div>
    </div>
  );
}