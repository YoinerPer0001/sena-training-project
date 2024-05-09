'use client'
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { CircleCheckBig, GraduationCap, ListChecks, BadgeAlert, BarChart, BookText, Clock, Video, FileType } from 'lucide-react';
import { Spinner } from "@/components/Spinner/Spinner"
import styles from './CourseDetails.module.scss'
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";


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
        fetch(`http://localhost:3000/api/v1/courses/${params.courseName}`)
            .then(data => data.json())
            .then(data => {
                setLoading(false)
                setDataCourse(data.data)
            })
    }, [params])

    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    return (
        <main className="flex flex-col lg:flex-grow max-w-[1024px] my-0 mx-auto">
            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center my-6">
                    <div className="flex gap-2 justify-center md:justify-between w-full items-center">
                        <div className="flex flex-col gap-2 md:min-w-[541px]">
                            <div className="flex justify-center w-full md:hidden"><GraduationCap size={36} color="#39a900" /></div>
                            <div className="mb-4 md:w-5/6">
                                {loading ? <div class="md:w-5/6">
                                    <div class="bg-gray-200 rounded-full dark:bg-gray-700 w-full h-6 mb-4"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                                </div> : ''}
                                <h1 className="font-bold text-2xl sm:text-3xl">{dataCourse.Nom_Cur}</h1>
                                <p className="text-sm sm:text-base font-medium">{dataCourse.Des_Cur}</p>
                            </div>
                            <div className="flex flex-col gap-4 md:w-5/6 md:min-w-5/6">
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-base font-semibold">Requisitos:</h4>
                                    <div className="text-sm lg:text-base font-semibold lg:font-medium p-3 border-1 border-azulSena rounded-lg flex items-center justify-start gap-2"><span><BadgeAlert /></span> Este curso no cuenta con requisitos previos.</div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className=" bg-azulSecundarioSena text-azulSena font-semibold flex items-center gap-1 px-2 py-1 rounded-md text-sm md:text-base"><BookText size={20} /> <p>23 clases</p></div>
                                    <div className=" bg-azulSecundarioSena text-azulSena font-semibold flex items-center gap-1 px-2 py-1 rounded-md text-sm md:text-base"><Clock size={20} /> <p>Duración: <span>10h 24m</span></p></div>

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
                <div className="w-full flex justify-center items center">
                    <button className="w-full md:w-[200px] p-3 text-white rounded-lg font-semibold bg-[#00324D] hover:bg-black transition-all duration-200">¡Inscribirse!</button>
                </div>
                <div className="w-full mt-8">
                    <div className="mb-4">
                        <h3 className="text-center text-2xl font-bold">Contenido del curso</h3>
                    </div>
                    <div>
                        <Accordion variant="splitted" selectionMode="multiple" className="bg-azulSena p-3 rounded-2xl gap-3" defaultExpandedKeys={["1"]}>
                            <AccordionItem key="1" aria-label="Accordion 1" title="Introducción" className="font-bold shadow bg-azulSecundarioSena" subtitle={
                                <p className="flex font-medium">
                                    24 clases | <span className="text-azulSena ml-1">Duración: 5h 23min</span>
                                </p>
                            }>
                                <ul className="flex flex-col gap-1 p-3 pt-0">
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <Video size={20} color="#39a900" /> Primeros pasos</li></a>
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <Video size={20} color="#39a900" /> Instalando los programas necesarios</li></a>
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <FileType size={20} color="#39a900" /> Recursos</li></a>
                                </ul>
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Accordion 2" title="¿Qué son las etiquetas?" className="font-bold shadow" subtitle={
                                <p className="flex font-medium">
                                    12 clases | <span className="text-azulSena ml-1">Duración: 6h 13min</span>
                                </p>
                            }>
                                <ul className="flex flex-col gap-1 p-3 pt-0">
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <Video size={20} color="#39a900" /> Primeros pasos</li></a>
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <Video size={20} color="#39a900" /> Instalando los programas necesarios</li></a>
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <FileType size={20} color="#39a900" /> Recursos</li></a>
                                </ul>
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Accordion 3" title={"Añadiendo estilos"} className="font-bold shadow" subtitle={
                                <p className="flex font-medium">
                                    45 clases | <span className="text-azulSena ml-1">Duración: 3h 26min</span>
                                </p>
                            }>
                                <ul className="flex flex-col gap-1 p-3 pt-0">
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <Video size={20} color="#39a900" /> Primeros pasos</li></a>
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <Video size={20} color="#39a900" /> Instalando los programas necesarios</li></a>
                                    <a href=""><li className="flex gap-1 items-center font-medium"> <FileType size={20} color="#39a900" /> Recursos</li></a>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>
        </main>
    )
}