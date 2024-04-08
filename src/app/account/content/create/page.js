'use client'
import styles from './createCourse.module.scss'
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Link from 'next/link'

export default function CreateCourse() {

  const [categories, setCategories] = useState([])
  const [dataCourse, setDataCourse] = useState({
    "Nom_Cur": undefined,
    "Des_Cur": undefined,
    "Hor_Cont_Total": 4,
    "Fech_Crea_Cur": undefined,
    "Id_Cat_FK": undefined,
    "Fot_Cur": "/foto.jpg"
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
          console.log(data)
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
              <input name='create_course_title' type="text" placeholder="Ejemplo: Aprende Photoshop desde cero" onChange={handleChangeName} value={dataCourse.Nom_Cur} />
            </div>
          </div> : ''}
          {pages == 1 ? <div className={styles.create_course_title}>
            <div>
              <h3>¿Cómo describirías el curso?</h3>
              {/* <p>No te preocupes, después podrás modificarlo.</p> */}
            </div>
            <div>
              <input name='create_course_title' type="text" placeholder="Ejemplo: Este curso está diseñado para brindar a los participantes una sól" maxlength="100" onChange={handleChangeDes} value={dataCourse.Nom_Cur} />
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
          {/* <div className={styles.create_course_description}>
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="max-w-xs"
              disableAutosize
              variant='faded'
            />
          </div>
           */}
          <footer className={styles.create_course_button}>
            {pages == 0 ? '' : <button onClick={prevPage} className={styles.prevButton}>Anterior</button>}
            <button onClick={nextPage} className={styles.nextButton}>Siguiente</button>
          </footer>
        </div>
      </div>
    </section>
  )
}
