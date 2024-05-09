'use client'
import CardCategories from '@/components/CardCategories/CardCategories'
import { Footer } from '@/components/Footer/Footer'
import { NavHome } from '@/components/Nav/NavHome'
import SignUpCards from '@/components/SignUpCard/SignUpCards'
import TopMessageHome from '@/components/TopMessageHome/TopMessageHome'
import styles from '@/styles/HomePage.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    try {
      fetch('http://localhost:3000/api/v1/courses')
        .then(data => data.json())
        .then(data => {
          const content = [data[0], data[1], data[2]]
          setCourses(content)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <NavHome />
      <main className={styles.main}>
        <section className={styles.section_header}>
          <div className={styles.header_top}>
            <div className="flex flex-col justify-end w-2/4 mb-3">
              <h4 className="text-5xl font-bold">Descrubre</h4>
              <h4 className="text-5xl font-bold text-[#39a900] relative left-16">Desarrolla</h4>
              <h4 className="text-5xl font-bold">Domina</h4>
            </div>
            <div className="w-3/4 font-medium">
              <p>Nuestra plataforma ofrece una amplia gama de cursos virtuales diseñados para empoderar a las mentes curiosas y ambiciosas.</p>
            </div>
          </div>
          <div>
            <Image src="/header2.svg" alt="" width={900} height={900} />
          </div>
        </section>
        <section className={styles.section_courses}>
          <div className='mb-5'>
            <h2 className='text-white font-bold text-3xl'>Cursos populares</h2>
          </div>
          <div className={styles.section_courses_container}>
            <SignUpCards title={"Aprende Adobe Photoshop desde cero"} category={'Artes gráficas'} img={"/port5.webp"} />
            <SignUpCards title={"Desarrollo web con PHP y Laravel"} category={'Sistemas'} img={"/port1.webp"} />
            <SignUpCards title={"Fotografía avanzada"} category={'Multimedia'} img={"/port4.webp"} />
          </div>
        </section>
        <section className={styles.section_categories}>
          <h2>Categorias destacadas</h2>
          <div className={styles.categories_container}>
            <div className={styles.categories_top}>
              <CardCategories title={"Sistemas"} img={'/svg-desarrollo.svg'} description={'Aprende a dominar el arte del desarrollo web, desde el diseño visual hasta la implementación del lado del servidor. Este curso exhaustivo te guiará a través de todas las etapas del desarrollo web, cubriendo tanto el frontend como el backend.'}/>
              <CardCategories title={"Gestión"} img={'/svg-gestion.svg'} description={'Domina los principios fundamentales de gestión y liderazgo para alcanzar el éxito en cualquier entorno profesional.'}/>
            </div>
            <div className={styles.categories_bottom}>          
              <CardCategories title={"Automotriz"} img={'/svg-automotriz.svg'} description={'Sumérgete en el fascinante mundo de la industria automotriz con este curso. Explora los fundamentos esenciales de la ingeniería, tecnología y negocios que sustentan el sector.'}/>
              <CardCategories title={"Multimedia"} img={'/svg-multimedia.svg'} description={'Descubre el mundo de la multimedia con clases de edición de video, diseño gráfico y más. Aprende las habilidades esenciales para crear contenido multimedia impactante y cautivador.'}/>
              <CardCategories title={"Bases de datos"} img={'/svg-bd.svg'} description={'Bot development frameworks were created as advanced software tools that eliminate a large amount of manual work and accelerate the development process.'}/>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
