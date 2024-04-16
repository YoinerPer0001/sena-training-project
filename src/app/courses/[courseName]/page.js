'use client'
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { CircleCheckBig, GraduationCap, ListChecks, BadgeAlert } from 'lucide-react';
import { Spinner } from "@/components/Spinner/Spinner"
import styles from './CourseDetails.module.scss'
import Image from "next/image";
import {ScrollShadow} from "@nextui-org/react";


const colors = {
    "azul-primario": "#00324D",
    "naranja-primario": "#FF6C20",
    "verde-primario": "#39a900",
    "azul-secundario": "#6fccff",
}


export default function CourseDetails() {
    const [dataCourse, setDataCourse] = useState({})
    const [loading, setLoading] = useState(true)
    const [scroll, setScroll] = useState(false)
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/cursos/${params.courseName}`)
            .then(data => data.json())
            .then(data => {
                setLoading(false)
                setDataCourse(data.data)
            })
    }, [params])
    return (
        <main className="flex flex-col lg:flex-grow max-w-[1024px] my-0 mx-auto">
            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center my-6">
                    <div className="flex gap-2 justify-center md:justify-between w-full items-center">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center w-full md:hidden"><GraduationCap size={36} color="#FF6C20" /></div>
                            <div className="mb-4">
                                {loading ? <div class="w-full">
                                    <div class="bg-gray-200 rounded-full dark:bg-gray-700 w-full h-6 mb-4"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                                </div> : ''}
                                <h1 className="font-bold text-2xl sm:text-3xl">{dataCourse.Nom_Cur}</h1>
                                <p className="text-sm sm:text-base font-medium">{dataCourse.Des_Cur}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-base font-semibold">Requisitos:</h4>
                                    <div className="text-sm lg:text-base font-semibold lg:font-medium p-3 border-1 border-[#FF6C20] rounded-lg flex items-center justify-start gap-2"><span><BadgeAlert /></span> Este curso no cuenta con requisitos previos.</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-base font-semibold">Lo que aprenderas:</h4>
                                    <ScrollShadow className={`flex flex-col gap-2 max-h-[100px] overflow-y-auto`} hideScrollBar>
                                        <li className="flex text-sm md:text-base gap-2 items-start">
                                            <div>
                                                <CircleCheckBig size={20} />
                                            </div>
                                            <p className="">{dataCourse.Des_Cur}</p>
                                        </li>
                                        <li className="flex text-sm md:text-base gap-2 items-start">
                                            <div>
                                                <CircleCheckBig size={20} />
                                            </div>
                                            <p className="">{dataCourse.Nom_Cur}</p>
                                        </li>
                                        <li className="flex text-sm md:text-base gap-2 items-start">
                                            <div>
                                                <CircleCheckBig size={20} />
                                            </div>
                                            <p className="">{dataCourse.Nom_Cur}</p>
                                        </li>
                                        <li className="flex text-sm md:text-base gap-2 items-start">
                                            <div>
                                                <CircleCheckBig size={20} />
                                            </div>
                                            <p className="">{dataCourse.Nom_Cur}</p>
                                        </li>
                                        <li className="flex text-sm md:text-base gap-2 items-start">
                                            <div>
                                                <CircleCheckBig size={20} />
                                            </div>
                                            <p className="">{dataCourse.Nom_Cur}</p>
                                        </li>
                                        <li className="flex text-sm md:text-base gap-2 items-start">
                                            <div>
                                                <CircleCheckBig size={20} />
                                            </div>
                                            <p className="">{dataCourse.Nom_Cur}</p>
                                        </li>
                                    </ScrollShadow>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <picture>
                                <Image className="rounded-lg" src={'/port3.webp'} alt={`Portada del curso: ${dataCourse.Nom_Cur}`} width={500} height={350} />
                            </picture>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start items center">
                    <button className="w-full md:w-[200px] p-3 text-white rounded-lg font-bold bg-[#00324D] hover:bg-black transition-all duration-200">Inscribirse</button>
                </div>
                <div className="w-full mt-8">
                    <h3 className="text-center text-2xl font-bold">Contenido del curso</h3>
                </div>
            </section>
        </main>
    )
}