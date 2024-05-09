'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeftToLine } from 'lucide-react'
import Link from 'next/link'
import Dropzone from 'react-dropzone'

export default function ManageCourses() {
    const pathname = usePathname()

    const [categories, setCategories] = useState()
    const [dataCourse, setDataCourse] = useState({})

    const id = pathname.split('/')
    const idCourse = id[id.length - 1]


    useEffect(() => {
        // FETCH CATEGORÍAS
        fetch('http://localhost:3000/api/v1/categories')
            .then((response) => response.json())
            .then((data) => {
                const categories = data.data.map(category => ({
                    'id': category.Id_Cat,
                    'name': category.Nom_Cat,
                }));
                setCategories(categories)
            })

        // FETCH INFORMACIÓN DEL CURSO
        fetch(`http://localhost:3000/api/v1/courses/${idCourse}`)
            .then((response) => response.json())
            .then((data) => {
                const course = data.data
                console.log(course)
                setDataCourse(course)
            })
    }, [])

    return (
        <div className="bg-gray-100 flex flex-col h-full gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
            <div>
                <div className='relative flex items-center justify-center'>
                    <h4 className='font-semibold text-2xl text-center'>Información básica</h4>
                    <div className='absolute left-0 flex items-center justify-start'>
                        <Link className='my-auto transition-all duration-150 flex items-center gap-2 hover:bg-gray-300 p-2 rounded-lg font-medium' href={'/admin/content'}><ArrowLeftToLine /> Volver</Link>
                    </div>
                </div>
                <hr className='w-full my-5' />
                <p>Los siguientes resúmenes estarán disponibles en la página principal de tu curso para que los estudiantes puedan evaluar si el curso es adecuado para ellos. Estos resúmenes influirán directamente en el rendimiento del curso.</p>
                <form className='my-4 flex flex-col gap-5 dropzone'>
                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-base ml-1'>Nombre del curso</label>
                        <input type="text" name='Nom_Cur' className='p-2 rounded-lg border-1 border-gray-200' placeholder='Introduce el nombre del curso.' defaultValue={dataCourse.Nom_Cur}/>
                        <span className='text-xs ml-1 text-gray-500'>El nombre del curso debe tener máximo 50 palabras.</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-base ml-1'>Descripción</label>
                        <input type="text" name='Des_Cur' className='p-2 rounded-lg border-1 border-gray-200' placeholder='Introduce el la descripción del curso.' defaultValue={dataCourse.Des_Cur} />
                        <span className='text-xs ml-1 text-gray-500'>La descripción debe tener máximo 100 palabras.</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-base ml-1'>Categoría</label>
                        <select className='rounded-lg p-2 outline-none border-1 border-gray-200 cursor-pointer'>
                            <option value='0'>- Selecciona una categoría -</option>
                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <span className='text-xs ml-1 text-gray-500'>Escoge la categoría que mejor se adapte a tu curso.</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-base ml-1'>Imagen del curso</label>
                        <div className='flex gap-4 justify-start'>
                            <div className='w-[375px] h-[211px] rounded-lg border-1 border-gray-300'>
                                <Image alt='Imagen por defecto del un curso.' width={375} height={211} src={'/foto-curso-default.jpg'} className='rounded-lg object-cover w-full h-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-2/4'>
                                <p>Por favor, sube la imagen de tu curso siguiendo estas directrices de calidad: dimensiones de 750 x 422 píxeles y formato .jpg, .jpeg, .gif, o .png. Asegúrate de que la imagen no contenga texto.</p>
                                <input type="file" className='rounded-lg p-2 border-1 border-gray-300' />
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
