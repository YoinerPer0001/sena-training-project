'use client'
import styles from './createCourse.module.scss'
import { Progress } from "@nextui-org/react";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { ImagePlus, Pencil, ArrowLeftToLine, CircleCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import toast from "react-hot-toast";
import { getCookie } from 'cookies-next';
import CategoryIndicator from '@/components/usersComponents/CategoryIndicator/CategoryIndicator';

export default function CreateCourse() {
  const token = getCookie('sessionToken')
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [file, setFile] = useState()
  const [uploading, setUploading] = useState(false)
  const [dataCourse, setDataCourse] = useState({
    "Nom_Cur": null,
    "Des_Cur": null,
    "Id_Cat_FK": null,
  })
  const [pages, setPages] = useState(0)
  const nextPage = () => {
    setPages(pages + 1)
  }
  const prevPage = () => {
    setPages(pages - 1)
  }



  useEffect(() => {
    try {
      fetch('http://localhost:3000/api/v1/categories')
        .then(data => data.json())
        .then(data => {
          const categories = data.data.map(category => ({
            'id': category.Id_Cat,
            'name': category.Nom_Cat,
          }));
          setCategories(categories)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleChangeName = (e) => {
    setDataCourse(prevState => ({
      ...prevState,  // Mantener las propiedades existentes
      Nom_Cur: e.target.value
    }))
  }
  const handleChangeDes = (e) => {
    setDataCourse(prevState => ({
      ...prevState,  // Mantener las propiedades existentes
      Des_Cur: e.target.value
    }))
  }
  const handleChangeCategory = (e) => {
    setDataCourse(prevState => ({
      ...prevState,  // Mantener las propiedades existentes
      Id_Cat_FK: e.target.value
    }))
  }

  const formSubmit = async (e) => {
    setUploading(true)
    e.preventDefault()
    if (!file) {
      return
    }

    const form = new FormData()
    form.set('file', file)

    // Sending file
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      })

      const data = await res.json()
      console.log(data)
      setDataCourse(prevState => ({
        ...prevState,  // Mantener las propiedades existentes
        Fot_Cur: data.url,
        Fech_Crea_Cur: new Date(Date.now())
      }))
      setUploading(false)
      show()
    } catch (e) {
      console.log(e)
    }
  }

  const createCourse = async () => {
    try {
      fetch('http://localhost:3000/api/v1/courses/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(dataCourse)
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.type === 'success') {
          toast.success('Curso creado correctamente')
          router.push(`/admin/content/manage/${response.data.InsertedId}`)
        }
      });

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="bg-gray-100 flex flex-col h-full gap-2 p-4 max-h-full rounded-lg overflow-y-auto relative">
      <div className='absolute top-4 hidden lg:flex'>
        <Link href="/content" className='transition-all duration-200 flex items-center gap-2 font-semibold hover:bg-gray-300 p-2 rounded-lg'>
          <ArrowLeftToLine /> Volver
        </Link>
      </div>
      <div className='w-full h-full items-center flex flex-col'>
        <div className='flex flex-col justify-between h-full w-full'>
          <div className='w-full'>
            <header className="flex w-full justify-center items-center">
              <CategoryIndicator pages={pages} label={"Titulo"} actualPage={0}/>
              <div className={`h-[2px] min-w-[25px] md:min-w-[80px] bg-transparent border-b-2 ${pages > 0 ? 'border-[#6fccff]' : 'border-gray-400'}`}></div>
              <CategoryIndicator pages={pages} label={"Descripción"} actualPage={1}/>
              <div className={`h-[2px] min-w-[25px] md:min-w-[80px] bg-transparent border-b-2 ${pages > 1 ? 'border-[#6fccff]' : 'border-gray-400'}`}></div>
              <CategoryIndicator pages={pages} label={"Categoría"} actualPage={2}/>
            </header>
            {pages == 0 ?
              <>
                <div className='mt-6 flex justify-center flex-col items-center'>
                  <h3 className='text-xl md:text-3xl p-2 pb-0 text-center font-bold'>Escoge un título para el curso.</h3>
                  <p className='text-sm md:text-base'>No te preocupes, después podrás modificarlo.</p>
                </div>
                <div className='flex justify-center mt-2'>
                  <input className='text-sm md:text-base p-2 border-1 outline-1 outline-azulSena border-gray-300 rounded-lg w-2/4' name='create_course_title' type="text" placeholder="Ejemplo: Aprende Photoshop desde cero" maxLength="70" onChange={handleChangeName} value={dataCourse.Nom_Cur ? dataCourse.Nom_Cur : ''} />
                </div> 
              </> : ''}
            {pages == 1 ? <>
              <div className='mt-6 flex justify-center flex-col items-center'>
                <h3 className='text-xl md:text-3xl p-2 pb-0 text-center font-bold'>¿Cómo describirías el curso?</h3>
                <p className='text-sm md:text-base'>No te preocupes, después podrás modificarlo.</p>
              </div>
              <div className='flex justify-center mt-2'>
                <input className='text-sm md:text-base p-2 border-1 outline-1 outline-azulSena border-gray-300 rounded-lg w-2/4' name='create_course_title' type="text" placeholder="Ejemplo: Este curso está diseñado para aquellos que desean adentrarse en el mundo de la programación." maxLength="100" onChange={handleChangeDes} value={dataCourse.Des_Cur ? dataCourse.Des_Cur : ''} />
              </div>
            </> : ''}
            {pages == 2 ? <>
              <div className='mt-6 flex justify-center flex-col items-center'>
                <h3 className='text-xl md:text-3xl p-2 pb-0 text-center font-bold'>¿A qué categoria se acomodaría mejor el curso?</h3>
                <p className='text-sm md:text-base'>Si no lo tienes claro, puedes modificarlo luego.</p>
              </div>
              <div>
                <div className='flex justify-center mt-2'>
                  <select
                    // label="Seleccionar categoría"
                    // className="max-w-xs"
                    // variant='bordered'
                    className='cursor-pointer text-sm md:text-base p-2 border-1 outline-1 outline-azulSena border-gray-300 rounded-lg w-2/4'
                    onChange={handleChangeCategory}
                    defaultValue={dataCourse.Id_Cat_FK}
                  >
                    {categories.map((category) => (
                      <option key={category.name} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </> : ''}
            {pages == 3 ? <>
              <div>
                <h3 className='text-xl md:text-3xl p-2 pb-0 text-center font-bold'>Subir portada del curso</h3>
                <p className='text-sm md:text-base'>Es recomendable una relación de aspecto de 16:9 y 720p de calidad.</p>
              </div>
              <div>
                <div className={styles.create_course_price}>
                  <form onSubmit={formSubmit} className={styles.form_image}>
                    <input type='file'
                      onChange={(e) => {
                        setFile(e.target.files[0])
                      }}
                    />
                    <button>Subir imagen</button>
                    {uploading ? <Progress
                      size="sm"
                      isIndeterminate
                      aria-label="Loading..."
                      className="max-w-md"
                    /> : ''}
                  </form>
                </div>
              </div>
            </> : ''}
          </div>
          <footer className='flex flex-col items-center gap-3 justify-center'>
            <div className='flex items-center gap-2 justify-center'>
              {pages == 0 ? '' : <button onClick={prevPage} className='bg-azulSena text-sm md:text-base text-white p-2 rounded-lg transition-all duration-150 hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-500 flex items-center gap-1'><ChevronLeft size={18}/> Anterior</button>}
              {pages != 2 ? <button onClick={nextPage} className='bg-azulSena text-sm md:text-base text-white p-2 rounded-lg transition-all duration-150 hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-500 flex items-center gap-1' disabled={pages == 0 && dataCourse.Nom_Cur == null || dataCourse.Nom_Cur == '' || pages == 1 && dataCourse.Des_Cur == null || dataCourse.Des_Cur == ''}>Siguiente <ChevronRight size={18} /></button> : <button onClick={createCourse} className='bg-azulSena text-white rounded-lg p-2 hover:bg-black transition-all duration-150 flex items-center gap-1'>Finalizar <CircleCheck size={18}/></button>}
            </div>
            <div className='flex lg:hidden items-center gap-2 justify-center'>
              <Link href="/content" className='flex text-sm md:text-base items-center gap-2 font-semibold hover:bg-gray-300 p-2 rounded-lg transition-all duration-200'>
                <ArrowLeftToLine /> Volver
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
