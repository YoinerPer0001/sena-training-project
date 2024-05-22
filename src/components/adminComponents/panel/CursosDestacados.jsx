import { useGetFetch } from "../fetchActions/GetFetch"
import Link from 'next/link'
import Image from 'next/image'
export const CursosDestacados = () => {

    const { data, isLoading } = useGetFetch('http://localhost:3000/api/statistics/courses/featured')
    let i = 0;

    return (
        <div className="p-4  bg-white h-full rounded-lg border shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Cursos destacados</h3>

            </div>
            <div className="flow-root">
                {isLoading ? <div>Cargando...</div> : (
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map(curso => {
                            i++;
                            return (
                                <li className="py-3 sm:py-4">
                                    <Link href={'/'} className="flex items-center space-x-4">
                                        <span className=" h-10 w-10 flex justify-center items-center font-semibold rounded-full  text-white text-2xl bg-verdeSena text-center">{i}</span>
                                        <div className="flex-shrink-0">
                                            <Image className="w-8 h-8 rounded-full" width={40} height={40} src={curso.Curso.Fot_Cur || '/Cursos-defecto.JPG'} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm  text-[#00324D] font-semibold  truncate dark:text-white">
                                                {curso.Curso.Nom_Cur}
                                            </p>
                                            <div className="flex flex-row">
                                                <span className="text-sm font-medium text-[#1f485e] mr-1 truncate dark:text-gray-400">Instructor:</span>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {curso.Curso.Usuario.Nom_User + " " + curso.Curso.Usuario.Ape_User}
                                                </p>

                                            </div>
                                            <div className="flex flex-row">
                                                <span className="text-sm font-medium text-[#1f485e] mr-1 truncate dark:text-gray-400">Cant Usu:</span>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {curso.inscripciones}
                                                </p>

                                            </div>

                                        </div>
                                    </Link>
                                </li>

                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
