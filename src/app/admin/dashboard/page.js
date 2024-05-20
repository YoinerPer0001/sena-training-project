'use client'
import BarrasGraphic from "@/components/adminComponents/graphics/panel";
import styles from './dashboard.module.scss'
import Link from 'next/link'
import Indicador from "@/components/adminComponents/graphics/Indicadores";
import Circular from "@/components/adminComponents/graphics/circular";


export default function dashboardPage() {
  return (
    <div className={`${styles.contPrincipal} h-full w-full p-4 flex bg-[#F1F5F6]`}>

       {/* {CONTENEDOR IZQUIERDO} */}
      <div className={`${styles.contPrinIzq} w-max border-b-3 flex flex-col md:lg:xl:pr-3 mr-3 `}>

        <div className={`${styles.contPrinIzq_sup} h-72 inline-flex flex-col justify-center items-end rounded-lg mb-2 w-full  bg-[#ffffff]`}>
          <div className="w-full text-start pl-4 pt-2">
            <span className={`${styles.roboto} text-md font-sans  mb-2 text-[#21264F]`}>Inscripciones en los ultimos meses</span>
          </div>
          <BarrasGraphic />
        </div>
        <div className={`${styles.contPrinIzq_inf}   w-full h-1/2 grid gap-2 py-4 `}>

          <div className={`bg-[#ffffff] h-44 rounded-lg flex flex-col justify-center items-center pt-2 `} >
            <span className={`${styles.roboto} text-center text-[#21264F]`}>Número Total de usuarios</span>
            <Indicador />
          </div>
          <div className={`bg-[#ffffff] h-44 rounded-lg flex flex-col justify-center items-center pt-2 `} >
            <span className={`${styles.roboto} text-center text-[#21264F]`}>Tasa de finalización de cursos</span>
            <Indicador />
            
          </div>
          <div className={`bg-[#ffffff] h-44 rounded-lg flex flex-col justify-center items-center pt-2 `} >
            <span className={`${styles.roboto} text-center text-[#21264F]`}>Progreso promedio de los usuarios</span>
            <Indicador />
           

          </div>
          <div className={`bg-[#ffffff] h-44 rounded-lg flex flex-col justify-center items-center pt-2 `} >
            <span className={`${styles.roboto} text-center text-[#21264F]`}>Tasa de abandono de cursos</span>
            <Indicador />
            
          </div>
        </div>

      </div>
      {/* {CONTENEDOR DERECHO} */}
      <div className={`${styles.contPrinDer} w-1/3 relative   `} >
        <div className="p-4  bg-white h-full rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Cursos destacados</h3>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              View all
            </Link>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <Link href={'/'} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Analisis y desarrollo de software
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Juan Olivares
                    </p>
                  </div>
                  
                </Link>
              </li>
              <li className="py-3 sm:py-4">
                <Link href={'/'} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"> */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Administracion de empresas
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Gustavo Petro
                    </p>
                  </div>
                  
                </Link>
              </li>
              <li className="py-3 sm:py-4">
                <Link href={'/'} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael image"> */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      JAVA 
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Julian Perez
                    </p>
                  </div>
                 
                </Link>
              </li>
              <Link href={'/'} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Lana image"> */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Bootcamp Full Stack
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Pedro Marquez
                    </p>
                  </div>
                 
                </div>
              </Link>
              <li className="pt-3 pb-0 sm:pt-4">
                <Link href={'/'} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Thomas image"> */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Psicologia
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Andrea Cordoba
                    </p>
                  </div>
                 
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}
