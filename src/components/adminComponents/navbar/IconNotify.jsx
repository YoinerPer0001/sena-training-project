'use client'
import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useGetFetch } from '@/hooks/fetchActions/GetFetch'
import { FaCircle } from "react-icons/fa";

const IconNotify = () => {
    const [visible, setVisible] = useState(false)
    const [Leidos, setLeidos] = useState(true)
    const [refresh, setRefresh] = useState(0)
    const authState = useSelector(state => state.auth)

    const sessionToken = authState.token
    const user = authState.user

    const { Id_User } = user;
    const { data, isLoading } = useGetFetch(`http://localhost:3000/api/v1/notifications/user/${Id_User}`)

    const visibleNot = () => {
        setVisible(!visible)
    }

    useEffect(() => {
        if (!isLoading && data.length < 1) {
            setLeidos(true)
        } else {
            setLeidos(false)
        }
    }, [isLoading, data])

    const selecciono = async (value) => {
        const response = await fetch(`http://localhost:3000/api/v1/notifications/user/update/${value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionToken ? `Bearer ${sessionToken}` : '',
            },
            body: JSON.stringify({
                Id_Not_Usu: value,
                leida: true
            })
        })

        if (response.ok) {
            setRefresh(prev => prev + 1);
        } else {
            console.error("Error al actualizar la notificación");
        }
    }

    return (
        <div>
            <button className='flex items-start' onClick={visibleNot}>
                <Bell className="text-2xl mx-3" />
                {!Leidos && (
                    <span className="absolute flex h-3 w-3">
                        <span className="animate-ping absolute ml-6 z-20 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="absolute inline-flex ml-6 z-20 rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                )}
            </button>

            <div className={`absolute right-0 shadow-xl shadow-[#00000050] mt-8 lg:mr-8 md:lg:xl:2xl:w-96 bg-white rounded-md overflow-hidden z-20 transition-all duration-300 ease-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {!isLoading && data.map(notificacion => (
                    !notificacion.leida && (
                        <div key={notificacion.Id_Not_Usu} className="flex items-center py-2 border-b border-gray-200">
                            <FaCircle className='size-4 text-azulSecundarioSena mx-2' />
                            <div className='w-80 flex items-center'>
                                <div className='w-72'>
                                    <p className="text-gray-600 mx-2 text-sm">
                                        <span className="font-bold">{notificacion.notificacione.Not_Tit}</span>
                                    </p>
                                    <p className="text-sm mx-2">
                                        <span className="">{notificacion.notificacione.Not_Mens}</span>
                                    </p>
                                </div>
                                <input onClick={() => selecciono(notificacion.Id_Not_Usu)} className='size-4' type="checkbox" />
                            </div>
                        </div>
                    )
                ))}
                {data.length < 1 && <div className='w-full flex items-center py-4 px-4 text-sm font-medium text-center justify-center'>No se encontraron nuevas notificaciones</div>}
                <Link href="#" className="block bg-azulSena hover:bg-black transition-all duration-150 text-white text-center font-semibold py-2">Ver todas</Link>
            </div>
        </div>
    );
}

export default IconNotify;
