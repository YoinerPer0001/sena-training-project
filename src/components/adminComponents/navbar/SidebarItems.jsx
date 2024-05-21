'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useGetFetch } from '../fetchActions/GetFetch';
import {
    LuLineChart,
    LuHome,
    LuUser,
    LuBook,
    LuSettings,
    LuBarChart2,
    LuBell,
    LuMessageSquare,
    LuFolder,
    LuUsers,
    LuCalendar,
    LuHelpCircle,
    LuPers
} from "react-icons/lu";

const listIcons = [
    { icon: <LuLineChart className='text-white text-2xl' />, label: 'Home' },              // Inicio
    { icon: <LuUsers className='text-white text-2xl'/>, label: 'Profile' },          // Perfil de Usuario
    { icon: <LuBook className='text-white text-2xl'/>, label: 'Courses' },           // Cursos
    { icon: <LuBell className='text-white text-2xl'/>, label: 'Settings' },      // Configuración
    { icon: <LuBarChart2 className='text-white text-2xl'/>, label: 'Analytics' },    // Análisis
    { icon: <LuSettings className='text-white text-2xl'/>, label: 'Notifications' },     // Notificaciones
    { icon: <LuMessageSquare className='text-white text-2xl'/>, label: 'Messages' }, // Mensajes/Comentarios
    { icon: <LuFolder className='text-white text-2xl'/>, label: 'Resources' },       // Recursos
    { icon: <LuUser className='text-white text-2xl'/>, label: 'Users' },             // Perfil Usuario
    { icon: <LuCalendar className='text-white text-2xl'/>, label: 'Calendar' },      // Calendario
    { icon: <LuHelpCircle className='text-white text-2xl'/>, label: 'Help' }         // Ayuda
];



export const SidebarItems = () => {

    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    const pathActual = usePathname();

    const { Id_Rol_FK } = JSON.parse(localStorage.getItem('name'));
    const url = `http://localhost:3000/api/v1/opciones_roles/rol/${Id_Rol_FK}`
    const { data, isLoading } = useGetFetch(url);

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, [])



    return (
        <div className="w-full flex flex-col px-3 items-start justify-start">
            { windowSize.width > 1214 ? isLoading ? 'Cargando...' : data.map(opcion => (
                <Link key={opcion.Opcion.id_opcion} href={opcion.Opcion.url}
                    className={`w-full  px-2 inline-flex space-x-2 items-center border-slate-700 py-3  hover:bg-white/5 transition ease-linear duration-150 ${pathActual === opcion.Opcion.url && 'bg-[#55768875] border-b'}`}>
                    <div key={opcion.Opcion.id_opcion} className="flex flex-row w-full items-center justify-start">
                        <div key={opcion.Opcion.id_opcion}  className="mx-2">
                            {listIcons[opcion.Opcion.id_opcion - 1].icon}
                        </div>
                        <span className="text-lg text-center  leading-5 text-white">{opcion.Opcion.nombre_opcion}</span>
                    </div>
                </Link>
            )) : isLoading ? 'Cargando...' : data.map(opcion => (
                <div key={opcion.Opcion.id_opcion} className="w-full flex flex-col items-center justify-start pt-3">
                    <Link key={opcion.Opcion.id_opcion+"k"} href={opcion.Opcion.url} className={`py-2 p-2 duration-150 ${pathActual === opcion.Opcion.url && 'bg-[#55768875]  rounded-lg'}`}>
                        {listIcons[opcion.Opcion.id_opcion - 1].icon}
                    </Link>
                </div>
            ))}
        </div>
    )
}
