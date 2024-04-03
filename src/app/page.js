'use client'
import { Footer } from '@/components/Footer/Footer'
import { NavHome } from '@/components/Nav/NavHome'
import SignUpCards from '@/components/SignUpCard/SignUpCards'
import styles from '@/styles/HomePage.module.scss'
import Image from 'next/image'
import { useSelector } from 'react-redux'

export default function Home() {

  return (
    <>
      <NavHome />
      <main className={styles.main}>
        <section className={styles.section_header}>
          <div className={styles.header_top}>
            <div className="flex flex-col justify-end w-2/4 mb-3">
              <h4 className="text-5xl font-bold">Descrubre</h4>
              <h4 className="text-5xl font-bold text-[#FF6C20] relative left-16">Desarrolla</h4>
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
            <SignUpCards score={"5"} title={"Desarrollo web con HTML, CSS Y JavaScript"} category={"sistemas"} img={"/image1.jpg"} />
            <SignUpCards score={"5"} title={"Actividad física con balón retenido"} category={"deporte"} img={"/image6.jpg"} />
            <SignUpCards score={"5"} title={"Base de datos con MySQL y PostgresSQL"} category={"sistemas"} img={"/image3.jpeg"} />
          </div>
        </section>
        <section className={styles.section_categories}>
          <h2>Categorias destacadas</h2>
          <div className={styles.categories_container}>
            <div className={styles.categories_top}>
              <article>
                <div className="relative h-full ml-0 mr-0 ">
                  <div className="relative h-full rounded-lg">
                    <div className="flex items-center p-5 pb-0 -mt-1">
                      <Image src={'/svg-desarrollo.svg'} alt='icon' width={40} height={40} />
                      <h3 className="my-2 ml-3 text-lg font-bold ">Sistemas</h3>
                    </div>
                    <hr className="mt-3 mb-3 text-xs font-medium text-blue-900 uppercase" />
                    <p className="mb-2 px-5">Aprende a dominar el arte del desarrollo web, desde el diseño visual hasta la implementación del lado del servidor. Este curso exhaustivo te guiará a través de todas las etapas del desarrollo web, cubriendo tanto el frontend como el backend.</p>
                  </div>
                </div>
              </article>
              <article>
                <div className="relative h-full ml-0">
                  <div className="relative h-full rounded-lg">
                    <div className="flex items-center p-5 pb-0 -mt-1">
                      <Image src={'/svg-gestion.svg'} alt='icon' width={40} height={40} />
                      <h3 className="my-2 ml-3 text-lg font-bold ">Gestión</h3>
                    </div>
                    <hr className="mt-3 mb-3 text-xs font-medium  uppercase" />
                    <p className="mb-2 px-5">Domina los principios fundamentales de gestión y liderazgo para alcanzar el éxito en cualquier entorno profesional.</p>
                  </div>
                </div>
              </article>
            </div>
            <div className={styles.categories_bottom}>
              <article>
                <div className="relative h-full ml-0 mr-0">
                  <div className="relative h-full rounded-lg">
                    <div className="flex items-center p-5 pb-0 -mt-1">
                      <Image src={'/svg-automotriz.svg'} alt='icon' width={40} height={40} />
                      <h3 className="my-2 ml-3 text-lg font-bold ">Automotriz</h3>
                    </div>
                    <hr className="mt-3 mb-3 text-xs font-medium  uppercase" />
                    <p className="mb-2 px-5">Sumérgete en el fascinante mundo de la industria automotriz con este curso. Explora los fundamentos esenciales de la ingeniería, tecnología y negocios que sustentan el sector. </p>
                  </div>
                </div>
              </article>
              <article>
                <div className="relative h-full ml-0 mr-0">
                  <div className="relative h-full rounded-lg">
                    <div className="flex items-center -mt-1 p-5 pb-0">
                      <Image src={'/svg-multimedia.svg'} alt='icon' width={40} height={40} />
                      <h3 className="my-2 ml-3 text-lg font-bold ">Multimedia</h3>
                    </div>
                    <hr className="mt-3 mb-3 text-xs font-medium  uppercase" />
                    <p className="mb-2 px-5">Descubre el mundo de la multimedia con clases de edición de video, diseño gráfico y más. Aprende las habilidades esenciales para crear contenido multimedia impactante y cautivador.
                    </p>
                  </div>
                </div>
              </article>
              <article>
                <div className="relative h-full ml-0">
                  <div className="relative h-full rounded-lg">
                    <div className="flex items-center -mt-1 p-5 pb-0">
                      <Image src={'/svg-bd.svg'} alt='icon' width={40} height={40} />
                      <h3 class="my-2 ml-3 text-lg font-bold">Bases de datos</h3>
                    </div>
                    <hr className="mt-3 mb-3 text-xs font-medium uppercase" />
                    <p className="mb-2 px-5">Bot development frameworks were created as advanced software tools
                      that eliminate a large amount of manual work and accelerate the development process.</p>
                  </div>
                </div>
              </article>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
