'use client'
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { CircleCheckBig, GraduationCap, ListChecks, BadgeAlert, BarChart, BookText, Clock, Video, FileType } from 'lucide-react';
import { Spinner } from "@/components/usersComponents/Spinner/Spinner"
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { getNumberOfClasses } from "@/utils/utils";


const colors = {
    "azul-primario": "#00324D",
    "naranja-primario": "#FF6C20",
    "verde-primario": "#39a900",
    "azul-secundario": "#6fccff",
}


export default function CourseDetails() {
    const [dataCourse, setDataCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const router = useRouter();
    const { idCourse } = useParams() // Usar router.query para obtener el idCourse de la URL
    const token = getCookie('sessionToken');

    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const totalClases = getNumberOfClasses(dataCourse)
    useEffect(() => {
        if (!idCourse) return;

        fetch(`http://localhost:3000/api/v1/courses/${idCourse}`)
            .then(data => data.json())
            .then(data => {
                setLoading(false);
                setDataCourse(data.data);
            })
            .catch(err => console.error('Error fetching course data:', err));
    }, [idCourse]);

    useEffect(() => {
        if (user && idCourse) {
            async function checkEnrollment() {
                const response = await fetch(`http://localhost:3000/api/v1/inscription/user/${user.Id_User}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                const data = await response.json();
                const enrolled = data.data?.some((inscription) => inscription.Id_Cur_FK === idCourse);
                setIsEnrolled(enrolled);
            }
            checkEnrollment();
        }
    }, [user, idCourse]);

    const subscribe = async () => {
        if (!token) {
            return console.error('No se encontró el token');
        }

        try {
            const inscriptionResponse = await fetch(`http://localhost:3000/api/v1/inscription/create`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id_User: user.Id_User,
                    Id_Cur: idCourse
                })
            });

            const inscriptionData = await inscriptionResponse.json();

            if (inscriptionData.type === 'success') {
                const modulesResponse = await fetch(`http://localhost:3000/api/v1/modulo_curso/${idCourse}`);
                const modules = await modulesResponse.json();
                const modulesData = await modules.data

                if (modulesData.length > 0 && modulesData[0].Contenido_Modulos.length > 0) {
                    const firstClassId = modulesData[0].Contenido_Modulos[0].Id_Cont;
                    router.push(`/classes/${idCourse}/${firstClassId}`);
                } else {
                    console.error('No se encontraron clases para el curso.');
                }
            } else if (inscriptionData.code === 409) {
                throw new Error('Error en la inscripción, el usuario ya está inscrito');
            } else {
                throw new Error('Error en la inscripción');
            }
        } catch (err) {
            console.log('Error en la inscripción: ', err);
        }
    };

    return (
        loading ? <div className="h-screen w-screen flex justify-center items-center"><Spinner /></div> : <main className="flex flex-col lg:flex-grow max-w-[1024px] my-0 mx-auto">
            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center my-6">
                    <div className="flex gap-4 justify-center md:justify-between w-full items-center">
                        <div className="flex flex-col gap-2 md:min-w-[541px]">
                            <div className="flex justify-center w-full md:hidden">
                                <GraduationCap size={36} color="#39a900" />
                            </div>
                            <div className="mb-4 w-full">
                                <h1 className="font-bold text-2xl lg:text-3xl">{dataCourse.Nom_Cur}</h1>
                                <p className="text-sm sm:text-base font-medium">{dataCourse.Des_Cur}</p>
                            </div>
                            <div className="flex flex-col gap-4 md:w-5/6 md:min-w-5/6">
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-base font-semibold">Requisitos:</h4>
                                    <div className="text-sm lg:text-base font-semibold lg:font-medium p-3 border-1 border-azulSena rounded-lg flex items-center justify-start gap-2">
                                        <span><BadgeAlert /></span> Este curso no cuenta con requisitos previos.
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="bg-azulSecundarioSena text-azulSena font-semibold flex items-center gap-1 px-2 py-1 rounded-md text-sm md:text-base">
                                        <BookText size={20} /> <p>{totalClases} clases</p>
                                    </div>
                                    <div className="bg-azulSecundarioSena text-azulSena font-semibold flex items-center gap-1 px-2 py-1 rounded-md text-sm md:text-base">
                                        <Clock size={20} /> <p>Duración: <span>10h 24m</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <picture>
                                <Image className="rounded-lg" src={dataCourse.Fot_Cur || '/defaultBackground.webp'} alt={`Portada del curso: ${dataCourse.Nom_Cur}`} width={500} height={350} />
                            </picture>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items center">
                    <button onClick={subscribe} className="w-full md:w-[200px] p-3 text-white rounded-lg font-semibold bg-[#00324D] hover:bg-black transition-all duration-200"> {isEnrolled ? "Continuar curso" : (
                        "¡Inscribirse!"
                    )}</button>
                </div>

                {/* CONTENIDO DEL CURSO */}
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

                {/* OBJETIVOS DEL CURSO */}
                <div className="w-full mt-8">
                    <div className="mb-4">
                        <h3 className="text-center text-2xl font-bold">Objetivos del curso</h3>
                    </div>
                    <div className="w-full border-1 border-azulSena rounded-lg">
                        <ul className="font-medium text-sm p-4 w-full grid grid-cols-2 gap-4">
                            <li className="flex items-start gap-1 leading-4"><div><CircleCheckBig size={18} /></div> Aprender a utilizar Figma, desde 0 a experto</li>
                            <li className="flex items-start gap-1 leading-4"><div><CircleCheckBig size={18} /></div> Aprender a diseñar una página web responsive</li>
                            <li className="flex items-start gap-1 leading-4"><div><CircleCheckBig size={18} /></div> Realizar un proyecto práctico para diseñar una página web, para tu portfolio y futuros proyectos</li>
                            <li className="flex items-start gap-1 leading-4"><div><CircleCheckBig size={18} /></div> Entender cómo adaptar un diseño a los diferentes dispositivos</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}