'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useGetFetch } from '../../../hooks/fetchActions/GetFetch';
import {
    LineChart,
    Home,
    User,
    Book,
    Settings,
    BarChart2,
    Bell,
    MessageSquare,
    Folder,
    Users,
    Calendar,
    HelpCircle,
    Pers
} from "lucide-react";

const listIcons = [
    { icon: <LineChart className='text-white text-2xl' />, label: 'Home' },              // Inicio
    { icon: <Users className='text-white text-2xl' />, label: 'Profile' },          // Perfil de Usuario
    { icon: <Book className='text-white text-2xl' />, label: 'Courses' },           // Cursos
    { icon: <Bell className='text-white text-2xl' />, label: 'Settings' },      // Configuración
    { icon: <BarChart2 className='text-white text-2xl' />, label: 'Analytics' },    // Análisis
    { icon: <Settings className='text-white text-2xl' />, label: 'Notifications' },     // Notificaciones
    { icon: <MessageSquare className='text-white text-2xl' />, label: 'Messages' }, // Mensajes/Comentarios
    { icon: <Folder className='text-white text-2xl' />, label: 'Resources' },       // Recursos
    { icon: <User className='text-white text-2xl' />, label: 'Users' },             // Perfil Usuario
    { icon: <Calendar className='text-white text-2xl' />, label: 'Calendar' },      // Calendario
    { icon: <HelpCircle className='text-white text-2xl' />, label: 'Help' }         // Ayuda
];



export const SidebarItems = () => {

    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    const pathActual = usePathname();

    let storedData = null;

    // Verificar si localStorage está definido
    if (typeof localStorage !== 'undefined') {
        try {
            storedData = localStorage.getItem('name');
        } catch (e) {
            console.error("Se produjo un error al intentar acceder a localStorage:", e);
        }
    } else {
        console.warn("localStorage no está definido en este entorno.");
    }

    const { Id_Rol_FK } = storedData ? JSON.parse(storedData) : { Id_Rol_FK: 1 };

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
            {windowSize.width > 1214 ? isLoading ? 'Cargando...' : data.map(opcion => (
                <Link key={opcion.Opcion.id_opcion} href={opcion.Opcion.url}
                    className={`w-full  px-2 inline-flex space-x-2 items-center border-slate-700 py-3  hover:bg-white/5 transition ease-linear duration-150 ${pathActual === opcion.Opcion.url && 'bg-[#55768875] border-b'}`}>
                    <div key={opcion.Opcion.id_opcion} className="flex flex-row w-full justify-start">
                        <div key={opcion.Opcion.id_opcion} className="mx-2">
                            {listIcons[opcion.Opcion.id_opcion - 1].icon}
                        </div>
                        <span className="text-center  leading-5 text-white">{opcion.Opcion.nombre_opcion}</span>
                    </div>
                </Link>
            )) : isLoading ? 'Cargando...' : data.map(opcion => (
                <div key={opcion.Opcion.id_opcion} className="w-full flex flex-col items-center justify-start pt-3">
                    <Link key={opcion.Opcion.id_opcion + "k"} href={opcion.Opcion.url} className={`py-2 p-2 duration-150 ${pathActual === opcion.Opcion.url && 'bg-[#55768875]  rounded-lg'}`}>
                        {listIcons[opcion.Opcion.id_opcion - 1].icon}
                    </Link>
                </div>
            ))}
        </div>
    )
}
