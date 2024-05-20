'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useGetFetch } from '../fetchActions/GetFetch';
import { FaChartSimple, FaChartColumn  } from "react-icons/fa6";
import {
    IoHome,
    IoPerson,
    IoBook,
    IoSettings,
    IoStatsChart,
    IoNotifications,
    IoChatbubbles,
    IoFileTrayFull,
    IoPeople,
    IoCalendar,
    IoHelpCircle,
    IoHomeOutline,
    IoPeopleOutline,
    IoBookOutline,
    IoSettingsOutline,
    IoStatsChartOutline,
    IoNotificationsOutline,
    IoChatbubblesOutline,
    IoFileTrayFullOutline,
    IoPersonOutline,
    IoCalendarOutline,
    IoHelpCircleOutline

} from 'react-icons/io5';

const listIcons = [
    { icon: <FaChartSimple />, label: 'Home' },          // Inicio
    { icon: <IoPeople />, label: 'Profile' },      // Perfil de Usuario
    { icon: <IoBook />, label: 'Courses' },        // Cursos
    { icon: <IoSettings />, label: 'Settings' },   // Configuración
    { icon: <IoStatsChart />, label: 'Analytics' },// Análisis
    { icon: <IoNotifications />, label: 'Notifications' }, // Notificaciones
    { icon: <IoChatbubbles />, label: 'Messages' }, // Mensajes/Comentarios
    { icon: <IoFileTrayFull />, label: 'Resources' }, // Recursos
    { icon: <IoPerson />, label: 'Users' },        // Perfil Usuario
    { icon: <IoCalendar />, label: 'Calendar' },   // Calendario
    { icon: <IoHelpCircle />, label: 'Help' }      // Ayuda
];

const ListIconsCel = [
    { icon: <FaChartColumn className='text-white w-full text-3xl'/>, label: 'Home' },          // Inicio
    { icon: <IoPeopleOutline className='text-white w-full text-3xl' />, label: 'Profile' },     // Perfil de Usuario
    { icon: <IoBookOutline className='text-white w-full text-3xl'/>, label: 'Courses' },       // Cursos
    { icon: <IoSettingsOutline className='text-white w-full text-3xl'/>, label: 'Settings' },  // Configuración
    { icon: <IoStatsChartOutline className='text-white w-full text-3xl'/>, label: 'Analytics' },// Análisis
    { icon: <IoNotificationsOutline className='text-white w-full text-3xl'/>, label: 'Notifications' }, // Notificaciones
    { icon: <IoChatbubblesOutline className='text-white w-full text-3xl'/>, label: 'Messages' }, // Mensajes/Comentarios
    { icon: <IoFileTrayFullOutline className='text-white w-full text-3xl'/>, label: 'Resources' }, // Recursos
    { icon: <IoPersonOutline className='text-white w-full text-3xl'/>, label: 'Users' },       // Perfil Usuario
    { icon: <IoCalendarOutline className='text-white w-full text-3xl'/>, label: 'Calendar' },  // Calendario
    { icon: <IoHelpCircleOutline className='text-white w-full text-3xl'/>, label: 'Help' }     // Ayuda
  ];

export default listIcons;


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
                    <div key={opcion.Opcion.id_opcion} className="flex flex-row w-full justify-start">
                        <div key={opcion.Opcion.id_opcion}  className="mx-2">
                            {listIcons[opcion.Opcion.id_opcion - 1].icon}
                        </div>
                        <span className="text-lg text-center  leading-5 text-white">{opcion.Opcion.nombre_opcion}</span>
                    </div>
                </Link>
            )) : isLoading ? 'Cargando...' : data.map(opcion => (
                <div key={opcion.Opcion.id_opcion} className="w-full flex flex-col items-center justify-start pt-3">
                    <Link key={opcion.Opcion.id_opcion+"k"} href={opcion.Opcion.url} className={`py-2 p-2 duration-150 ${pathActual === opcion.Opcion.url && 'bg-[#55768875]  rounded-lg'}`}>
                        {ListIconsCel[opcion.Opcion.id_opcion - 1].icon}
                    </Link>
                </div>
            ))}
        </div>
    )
}