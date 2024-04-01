'use client'
import SignUpCards from '@/components/SignUpCard/SignUpCards'
import styles from  './HomePage.module.scss'
import Image from 'next/image'
import {useSelector} from 'react-redux'

export default function Home() {
  
  return (
    <main className={styles.main}>
        <section className={styles.section_header}>
          <div>
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
            <Image src="/header2.svg" alt="" width={600} height={600}/>
          </div>
        </section>
        <section className={styles.section_courses}>
          <div className='mb-5'>
            <h2 className='text-white font-bold text-4xl'>Cursos populares</h2>
          </div>
          <div className={styles.section_courses_container}>
            <SignUpCards score={"Nuestro curso de Desarrollo Front-End con HTML, CSS y JavaScript es tu punto de partida perfecto."} title={"Desarrollo web"} category={"arte"} img={"/image1.jpg"}/>
            <SignUpCards score={"5"} title={"Actividad física con balón retenido"} category={"deporte"} img={"/image6.jpg"}/>
            <SignUpCards score={"5"} title={"Desarrollo web"} category={"confección"} img={"/image3.jpeg"}/>
          </div>
        </section>
        <section className={styles.section_}>
        <div class="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-12">
          <h2 class="mb-5 text-3xl font-extrabold leading-tight text-gray-900">Categorias</h2>
          <div class="w-full">
              <div class="flex flex-col w-full mb-10 sm:flex-row">
                  <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                      <div class="relative h-full ml-0 mr-0 sm:mr-10 cursor-pointer hover:translate-y-3 transition-all duration-150">
                          <div class="relative h-full p-5 bg-white border-4 border-blue-900 rounded-lg">
                              <div class="flex items-center -mt-1">
                                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Desarrollo Web</h3>
                              </div>
                              <p class="mt-3 mb-1 text-xs font-medium text-blue-900 uppercase">------------</p>
                              <p class="mb-2 text-gray-600">Aprende a dominar el arte del desarrollo web, desde el diseño visual hasta la implementación del lado del servidor. Este curso exhaustivo te guiará a través de todas las etapas del desarrollo web, cubriendo tanto el frontend como el backend.</p>
                          </div>
                      </div>
                  </div>
                  <div class="w-full sm:w-1/2">
                      <div class="relative h-full ml-0 md:mr-10">
                          <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-900 rounded-lg"></span>
                          <div class="relative h-full p-5 bg-white border-2 border-blue-900 rounded-lg">
                              <div class="flex items-center -mt-1">
                                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Web 3.0 Development</h3>
                              </div>
                              <p class="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                              <p class="mb-2 text-gray-600">Web 3.0 is the third generation of Internet services that will
                                  focus on understanding and analyzing data to provide a semantic web.</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="flex flex-col w-full mb-5 sm:flex-row">
                  <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                      <div class="relative h-full ml-0 mr-0 sm:mr-10">
                          <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-900 rounded-lg"></span>
                          <div class="relative h-full p-5 bg-white border-2 border-blue-900 rounded-lg">
                              <div class="flex items-center -mt-1">
                                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Project Audit</h3>
                              </div>
                              <p class="mt-3 mb-1 text-xs font-medium text-blue-900 uppercase">------------</p>
                              <p class="mb-2 text-gray-600">A Project Audit is a formal review of a project, which is intended
                                  to assess the extent up to which project management standards are being upheld.</p>
                          </div>
                      </div>
                  </div>
                  <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                      <div class="relative h-full ml-0 mr-0 sm:mr-10">
                          <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-900 rounded-lg"></span>
                          <div class="relative h-full p-5 bg-white border-2 border-blue-900 rounded-lg">
                              <div class="flex items-center -mt-1">
                                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Hacking / RE</h3>
                              </div>
                              <p class="mt-3 mb-1 text-xs font-medium text-blue-900 uppercase">------------</p>
                              <p class="mb-2 text-gray-600">A security hacker is someone who explores methods for breaching
                                  defenses and exploiting weaknesses in a computer system or network.</p>
                          </div>
                      </div>
                  </div>
                  <div class="w-full sm:w-1/2">
                      <div class="relative h-full ml-0 md:mr-10">
                          <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-900 rounded-lg"></span>
                          <div class="relative h-full p-5 bg-white border-2 border-blue-900 rounded-lg">
                              <div class="flex items-center -mt-1">
                                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Bot/Script Development</h3>
                              </div>
                              <p class="mt-3 mb-1 text-xs font-medium text-blue-900 uppercase">------------</p>
                              <p class="mb-2 text-gray-600">Bot development frameworks were created as advanced software tools
                                  that eliminate a large amount of manual work and accelerate the development process.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        </section>
    </main>
  );
}
