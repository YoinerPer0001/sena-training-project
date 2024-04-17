'use client'
import styles from './createCourse.module.scss'
import { Progress } from "@nextui-org/react";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { ImagePlus, Pencil, ArrowLeftToLine } from 'lucide-react';
import toast from "react-hot-toast";

export default function CreateCourse() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M2bmdsdXA1YmFibiIsIk5vbV9Vc2VyIjoiU3RldmVuIiwiQXBlX1VzZXIiOiJDdWVudGFzIiwiRW1hX1VzZXIiOiJzdGV2ZW4wODEwbWlndWVsQG91dGxvb2suZXMiLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTMzNDA5NjQsImV4cCI6MTcxMzQyNzM2NH0.UQq5xlwa39I2JrYz3LQaJmlyV4o3UAhmjM01k-NWwfg'
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [file, setFile] = useState()
  const [uploading, setUploading] = useState(false)
  const [dataCourse, setDataCourse] = useState({
    "Nom_Cur": null,
    "Des_Cur": null,
    "Hor_Cont_Total": 4,
    "Fech_Crea_Cur": new Date(Date.now()),
    "Id_Cat_FK": null,
    "Fot_Cur": 'https://res.cloudinary.com/dla5djfdc/image/upload/v1713337504/portada-por-defecto-videos_jytqt0.png',
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

  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Imagen subida correctamente' });
  };

  const createCourse = async () => {
    try {
      const create = await fetch('http://localhost:3000/api/v1/cursos/new', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(dataCourse)
      })

      const response = await create.json()
      if (response.type === 'success') {
        // toast.success('Curso creado correctamente')
        router.push('/admin/content')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <section className={styles.container}>
      <div className='absolute top-4 hidden lg:flex'>
        <Link href="/admin/content" className='transition-all duration-200 flex items-center gap-2 font-semibold hover:bg-gray-300 p-2 rounded-lg'>
          <ArrowLeftToLine /> Volver
        </Link>
      </div>
      <div className={styles.container_create}>
        <div className={styles.create_course}>
          <div className={styles.create_course_title}>
            <div className="flex w-full justify-center items-center">
              <div className='flex flex-col justify-center items-center relative'>
                <span className={`flex justify-center items-center w-[40px] h-[40px] rounded-full ${pages >= 0 ? 'bg-[#6fccff] text-[#00324D] font-semibold' : 'bg-gray-400 text-white'}`}>1</span>
                <span className={`hidden md:block absolute top-10 ${pages >= 0 ? 'text-[#00324D] font-semibold' : ''}`}>Título</span>
              </div>
              <div className={`h-[2px] min-w-[25px] md:min-w-[80px] bg-transparent border-b-2 ${pages > 0 ? 'border-[#6fccff]' : 'border-gray-400'}`}></div>
              <div className='flex flex-col justify-center items-center relative'>
                <span className={`flex justify-center items-center w-[40px] h-[40px] rounded-full ${pages >= 1 ? 'bg-[#6fccff] text-[#00324D] font-semibold' : 'bg-gray-400 text-white'}`}>2</span>
                <span className={`hidden md:block absolute top-10 ${pages >= 1 ? 'text-[#00324D] font-semibold' : ''}`}>Descripción</span>
              </div>
              <div className={`h-[2px] min-w-[25px] md:min-w-[80px] bg-transparent border-b-2 ${pages > 1 ? 'border-[#6fccff]' : 'border-gray-400'}`}></div>
              <div className='flex flex-col justify-center items-center relative'>
                <span className={`flex justify-center items-center w-[40px] h-[40px] rounded-full ${pages >= 2 ? 'bg-[#6fccff] text-[#00324D] font-semibold' : 'bg-gray-400 text-white'}`}>3</span>
                <span className={`hidden md:block absolute top-10 ${pages >= 2 ? 'text-[#00324D] font-semibold' : ''}`}>Categoria</span>
              </div>
            </div>
            {pages == 0 ?
              <>
                <div>
                  <h3 className='text-xl md:text-3xl p-2 pb-0 text-center font-bold'>Escoge un título para el curso.</h3>
                  <p className='text-sm md:text-base'>No te preocupes, después podrás modificarlo.</p>
                </div>
                <div>
                  <input className='text-sm md:text-base' name='create_course_title' type="text" placeholder="Ejemplo: Aprende Photoshop desde cero" maxLength="70" onChange={handleChangeName} value={dataCourse.Nom_Cur ? dataCourse.Nom_Cur : ''} />

                </div> </> : ''}
            {pages == 1 ? <>
              <div>
                <h3 className='text-xl md:text-3xl p-2 pb-0 text-center font-bold'>¿Cómo describirías el curso?</h3>
                <p className='text-sm md:text-base'>No te preocupes, después podrás modificarlo.</p>
              </div>
              <div>
                <input name='create_course_title' type="text" placeholder="Ejemplo: Este curso está diseñado para brindar a los participantes una sól" maxLength="100" onChange={handleChangeDes} value={dataCourse.Des_Cur ? dataCourse.Des_Cur : ''} />
              </div>
            </> : ''}
            {pages == 2 ? <>
              <div>
                <h3 className='text-xl md:text-3xl p-2 pb-0 text-center font-bold'>¿A qué categoria se acomodaría mejor el curso?</h3>
                <p className='text-sm md:text-base'>Si no lo tienes claro, puedes modificarlo luego.</p>
              </div>
              <div>
                <div className={styles.create_course_price}>
                  <select
                    // label="Seleccionar categoría"
                    // className="max-w-xs"
                    // variant='bordered'
                    className={styles.select}
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
                  <Toast ref={toast} />
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
          <footer className={styles.create_course_button}>
            <div className={styles.pages_buttons}>
              {pages == 0 ? '' : <button onClick={prevPage} className={styles.prevButton}>Anterior</button>}
              {pages != 2 ? <button onClick={nextPage} className={styles.nextButton} disabled={pages == 0 && dataCourse.Nom_Cur == null || dataCourse.Nom_Cur == '' || pages == 1 && dataCourse.Des_Cur == null || dataCourse.Des_Cur == ''}>Siguiente</button> : <button onClick={createCourse} className={styles.nextButton}>Finalizar</button>}
            </div>
            <div className='flex lg:hidden'>
              <Link href="/admin/content" className='flex items-center gap-2 font-semibold hover:bg-gray-300 p-2 rounded-lg transition-all duration-200'>
                <ArrowLeftToLine /> Volver
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}
