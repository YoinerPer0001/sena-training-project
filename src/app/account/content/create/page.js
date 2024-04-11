'use client'
import styles from './createCourse.module.scss'
import { Progress } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function CreateCourse() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M2bmdsdXA1YmFibiIsIk5vbV9Vc2VyIjoiU3RldmVuIiwiQXBlX1VzZXIiOiJDdWVudGFzIiwiRW1hX1VzZXIiOiJzdGV2ZW4wODEwbWlndWVsQG91dGxvb2suZXMiLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTI3ODYzNjksImV4cCI6MTcxMjg3Mjc2OX0.HIZfrtavK8dU8sM7_fqXgva7nS_M-BKz_2G9lqIV8Uc'
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [file, setFile] = useState()
  const [uploading, setUploading] = useState(false)
  const [dataCourse, setDataCourse] = useState({
    "Nom_Cur": undefined,
    "Des_Cur": undefined,
    "Hor_Cont_Total": 4,
    "Fech_Crea_Cur": undefined,
    "Id_Cat_FK": undefined,
    "Fot_Cur": undefined,
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
    } catch (e) {
      console.log(e)
    }
  }

  const createCourse = async () => {
    try {
      const create = await fetch('http://localhost:3000/api/v1/cursos/new', {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+ token, 
        },
        body: JSON.stringify(dataCourse)
      })

      const response = await create.json()
      if(response.type === 'success'){
        router.push('/account/content')
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.container_create}>
        <div className={styles.create_course}>
          {pages == 0 ? <div className={styles.create_course_title}>
            <div>
              <h3>Escoge un título para el curso.</h3>
              <p>No te preocupes, después podrás modificarlo.</p>
            </div>
            <div>
              <input name='create_course_title' type="text" placeholder="Ejemplo: Aprende Photoshop desde cero" maxLength="70" onChange={handleChangeName} value={dataCourse.Nom_Cur} />
            </div>
          </div> : ''}
          {pages == 1 ? <div className={styles.create_course_title}>
            <div>
              <h3>¿Cómo describirías el curso?</h3>
              {/* <p>No te preocupes, después podrás modificarlo.</p> */}
            </div>
            <div>
              <input name='create_course_title' type="text" placeholder="Ejemplo: Este curso está diseñado para brindar a los participantes una sól" maxLength="100" onChange={handleChangeDes} value={dataCourse.Des_Cur} />
            </div>
          </div> : ''}
          {pages == 2 ? <div className={styles.create_course_title}>
            <div>
              <h3>¿A qué categoria se acomodaría mejor el curso?</h3>
              <p>Si no lo tienes claro, puedes modificarlo luego.</p>
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
          </div> : ''}
          {pages == 3 ? <div className={styles.create_course_title}>
            <div>
              <h3>Subir portada del curso</h3>
              <p>Es recomendable una relación de aspecto de 16:9 y 720p de calidad.</p>
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
          </div> : ''}
          <footer className={styles.create_course_button}>
            {pages == 0 ? '' : <button onClick={prevPage} className={styles.prevButton}>Anterior</button>}
            {pages != 3 ? <button onClick={nextPage} className={styles.nextButton} disabled={pages == 0 && dataCourse.Nom_Cur == undefined || pages == 1 && dataCourse.Des_Cur == undefined || pages == 2 && dataCourse.Id_Cat_FK == undefined ? true : false}>Siguiente</button> : <button onClick={createCourse} className={styles.nextButton}>Finalizar</button>}
          </footer>
        </div>
      </div>
    </section>
  )
}
