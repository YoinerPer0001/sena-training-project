'use client'
import CardCategories from '@/components/usersComponents/CardCategories/CardCategories'
import { Footer } from '@/components/usersComponents/Footer/Footer'
import { NavHome } from '@/components/usersComponents/Nav/NavHome'
import SignUpCards from '@/components/usersComponents/SignUpCard/SignUpCards'
import { Spinner } from '@/components/usersComponents/Spinner/Spinner'
import styles from '@/styles/HomePage.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    try {
      setIsMounted(true)
    } catch (error) {
      console.log(error)
      setIsMounted(true)
    }
  }, [])

  return (
    isMounted ? (
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
            <div className='flex gap-2 mb-2'>
              <CardCategories title={"Sistemas"} img={'/svg-desarrollo.svg'} description={'Aprende a dominar el arte del desarrollo web, desde el diseño visual hasta la implementación del lado del servidor. Este curso exhaustivo te guiará a través de todas las etapas del desarrollo web, cubriendo tanto el frontend como el backend.'}/>
              <CardCategories title={"Gestión"} img={'/svg-gestion.svg'} description={'Domina los principios fundamentales de gestión y liderazgo para alcanzar el éxito en cualquier entorno profesional.'}/>
            </div>
            <div className='flex gap-2'>          
              <CardCategories title={"Automotriz"} img={'/svg-automotriz.svg'} description={'Sumérgete en el fascinante mundo de la industria automotriz con este curso. Explora los fundamentos esenciales de la ingeniería, tecnología y negocios que sustentan el sector.'}/>
              <CardCategories title={"Multimedia"} img={'/svg-multimedia.svg'} description={'Descubre el mundo de la multimedia con clases de edición de video, diseño gráfico y más. Aprende las habilidades esenciales para crear contenido multimedia impactante y cautivador.'}/>
              <CardCategories title={"Bases de datos"} img={'/svg-bd.svg'} description={'Bot development frameworks were created as advanced software tools that eliminate a large amount of manual work and accelerate the development process.'}/>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>) : <div className='h-screen flex justify-center items-center'><Spinner /></div>
  );
}
