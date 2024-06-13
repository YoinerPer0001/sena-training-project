'use client'
import { ArrowDownToLine, BadgeCheck, Check } from 'lucide-react'
import React from 'react'

export default function page() {
    return (
        <div className='w-3/4 mx-auto mt-6'>
            <div>
                <h1 className='font-bold text-3xl'>Progreso del estudiante</h1>
                <p className='text-gray-600 font-medium'>Sigue tu avance en los cursos de la plataforma</p>
            </div>

            <div className='flex flex-col my-4 border-gray-400 p-4 rounded-lg shadow-md bg-white'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className='font-bold text-xl'>Curso actual</h3>
                        <h4 className='font-medium text-base text-gray-600'>Introducción a la programación web</h4>
                    </div>
                    <div className='font-medium text-gray-600'>
                        Progreso: 75%
                    </div>
                </div>
                <div className='h-4 w-full rounded-full bg-gray-300'>
                    <div className='h-4 w-2/4 rounded-full bg-azulSena'></div>
                </div>
            </div>
            <div className='bg-white shadow-md p-4 my-4 rounded-lg'>
                <h2 className='font-bold text-xl my-3'>Cursos completados</h2>
                <div className='flex justify-between flex-wrap gap-4 overflow-y-auto'>
                    <div className='p-4  border-transparent transition-all duration-150  border rounded-lg min-w-[200px] flex-1 bg-gray-100 flex flex-col gap-2 items-center'>
                        <h3 className='font-bold text-lg whitespace-nowrap overflow-hidden w-full text-ellipsis'>{'HTML y CSS básico desde cero'}</h3>
                        <p className='bg-verdeSecundario text-verdeSena p-1 rounded-lg font-semibold flex items-center gap-2'>
                            <BadgeCheck strokeWidth={2.5} /> Completado
                        </p>
                    </div>
                    <div className='p-4  border-transparent transition-all duration-150  border rounded-lg min-w-[200px] flex-1 bg-gray-100 flex flex-col gap-2 items-center'>
                        <h3 className='font-bold text-lg whitespace-nowrap overflow-hidden w-full text-ellipsis'>{'HTML y CSS básico desde cero'}</h3>
                        <p className='bg-verdeSecundario text-verdeSena p-1 rounded-lg font-semibold flex items-center gap-2'><BadgeCheck strokeWidth={2.5} /> Completado</p>
                    </div>
                    <div className='p-4  border-transparent transition-all duration-150 border rounded-lg min-w-[200px] flex-1 bg-gray-100 flex flex-col gap-2 items-center'>
                        <h3 className='font-bold text-lg whitespace-nowrap overflow-hidden w-full text-ellipsis'>{'HTML y CSS básico desde cero'}</h3>
                        <p className='bg-verdeSecundario text-verdeSena p-1 rounded-lg font-semibold flex items-center gap-2'><BadgeCheck strokeWidth={2.5} /> Completado</p>
                    </div>
                    {/* <div className='font-medium text-gray-500'>
                        No has completado ningún curso aun.
                    </div> */}
                </div>
            </div>

            <div className='bg-white shadow-md my-4 p-4 rounded-lg'>
                <h2 className='font-bold text-xl my-3'>Cursos en progreso</h2>
                <div className='flex justify-between flex-wrap max-h-[210px] gap-4'>
                    <div className='p-4 rounded-lg min-w-[200px] max-w-[300px] flex-1 bg-gray-100 flex flex-col gap-2 items-center border-transparent transition-all duration-150 border'>
                        <h3 className='font-bold text-lg whitespace-nowrap overflow-hidden w-full text-ellipsis'>{'HTML y CSS básico desde cero'}</h3>
                        <div className='h-4 w-full rounded-full bg-gray-300'>
                            <div className='h-4 w-2/4 rounded-full bg-azulSena'></div>
                        </div>
                        <div className='font-medium text-left w-full text-gray-600'>
                            Progreso: 75%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
