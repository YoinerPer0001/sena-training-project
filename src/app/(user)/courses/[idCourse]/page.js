'use client'
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { CircleCheckBig, GraduationCap, ListChecks, BadgeAlert, BarChart, BookText, Clock, Video, FileType, Dot, FileCheck } from 'lucide-react';
import { Spinner } from "@/components/usersComponents/Spinner/Spinner"
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { getNumberOfClasses } from "@/utils/utils";
import toast from "react-hot-toast";


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

    const [requisitos, setRequisitos] = useState([])
    const [objetivos, setObjetivos] = useState([])

    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const totalClases = getNumberOfClasses(dataCourse)

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/obj_cursos/${idCourse}`)
            .then(response => response.json())
            .then(response => {
                if (response.type === 'success') {
                    setObjetivos(response.data)
                } else {
                    toast.error("Error al obtener los objetivos del curso")
                    console.log("Error: " + JSON.stringify(response));
                }
            })

        fetch(`http://localhost:3000/api/v1/curso/req-previos/${idCourse}`)
            .then(response => response.json())
            .then(response => {
                if (response.type === 'success') {
                    setRequisitos(response.data)
                } else {
                    toast.error("Error al obtener los requisitos del curso")
                    console.log("Error: " + JSON.stringify(response));
                }
            })
    }, [idCourse])

    useEffect(() => {
        if (!idCourse) return;

        fetch(`http://localhost:3000/api/v1/courses/${idCourse}`)
            .then(data => data.json())
            .then(data => {
                console.log(data.data)
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
    }, [user, idCourse, token]);

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
            <div className="flex flex-col md:flex-row md:items-start items-center w-full h-full overflow-x-hidden overflow-y-auto">
                <section className="flex md:mr-8 flex-col gap-2 items-center w-full md:w-3/4 xl:w-2/4">
                    <div className="">
                        <picture>
                            <Image className="rounded-lg" src={dataCourse.Fot_Cur || '/defaultBackground.webp'} alt={`Portada del curso: ${dataCourse.Nom_Cur}`} width={500} height={350} />
                        </picture>
                    </div>

                </section>
                <section className="flex flex-col justify-start items-center mt-4 md:mt-0 md:items-start w-full md:w-3/4 xl:w-2/4">
                    <div className="flex flex-col gap-2 items-center w-full">
                        <div className="flex gap-4 justify-center md:justify-between w-full items-center">
                            <div className="flex flex-col w-full gap-2 items-center">
                                <div className="mb-4 w-full">
                                    <h1 className="font-bold text-center md:text-left text-2xl lg:text-3xl">{dataCourse.Nom_Cur}</h1>
                                    <p className="text-sm sm:text-base text-center md:text-left font-medium">{dataCourse.Des_Cur}</p>
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-xl font-bold">Requisitos previos:</h4>
                                        {requisitos.length === 0 && <div className="text-sm lg:text-base font-semibold lg:font-medium p-3 border-1 border-azulSena rounded-lg flex items-center justify-start gap-2">
                                            <span><BadgeAlert /></span> Este curso no cuenta con requisitos previos.
                                        </div>}
                                        {requisitos?.filter(req => req.ESTADO_REGISTRO !== 0).map(req => {
                                            return (
                                                <div key={req.Id_Req} className="text-sm lg:text-base rounded-lg flex items-center justify-start gap-2">
                                                    <span><Dot strokeWidth={4} /></span> <span className="font-medium capitalize text-gray-600">{req.Desc_Req}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-xl font-bold">Objetivos del curso:</h4>
                                        {objetivos.length === 0 && <div className="text-sm lg:text-base font-semibold lg:font-medium p-3 border-1 border-azulSena rounded-lg flex items-center justify-start gap-2">
                                            <span><BadgeAlert /></span> Este curso no cuenta con objetivos.
                                        </div>}
                                        {objetivos?.filter(obj => obj.ESTADO_REGISTRO !== 0).map(obj => {
                                            return (
                                                <div key={obj.Id_Objetivo} className="text-sm lg:text-base rounded-lg flex items-center justify-start gap-2">
                                                    <span><Dot strokeWidth={4} /></span> <span className="font-medium capitalize text-gray-600">{obj.Desc_Objetivo}</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* CONTENIDO DEL CURSO */}
                    <div className="w-full mt-8">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold">Contenido del curso</h3>
                        </div>
                        <div>
                            <Accordion variant="splitted" selectionMode="multiple" className="rounded-2xl gap-3" defaultExpandedKeys={["1"]}>
                                {dataCourse.Modulocursos.map(modulo => {
                                    // Combina y ordena contenidos y evaluaciones por updatedAt
                                    const combinedItems = [...(modulo.Contenido_Modulos ?? []), ...(modulo.evaluacions ?? [])]
                                        .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

                                    return (
                                        <AccordionItem key={modulo.Id_Mod} title={modulo.Tit_Mod} className="font-bold shadow-xs bg-azulSecundarioSena" subtitle={
                                            <p className="flex font-medium">
                                                {modulo.Contenido_Modulos.length} clases | <span className="text-azulSena ml-1">Duración: {modulo.Horas_Cont_Mod} horas</span>
                                            </p>
                                        }>
                                            <ul className="flex flex-col gap-1 p-3 pt-0">
                                                {combinedItems.map(item => {
                                                    if (item.Id_Cont) {
                                                        // Es un contenido de módulo
                                                        return (
                                                            <li key={item.Id_Cont} className="flex gap-1 items-center font-medium">
                                                                <Video size={20} color="#39a900" /> {item.Tit_Cont}
                                                            </li>
                                                        );
                                                    } else if (item.Id_Eva) {
                                                        // Es una evaluación
                                                        return (
                                                            <li key={item.Id_Eva} className="flex gap-1 items-center font-medium">
                                                                <FileCheck size={20} color="#39a900" /> {item.Tit_Eva}
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </ul>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </div>

                    </div>
                    <div className="my-4 w-full">
                        <div className="flex items-center mb-4 justify-center gap-2">
                            <div className="bg-azulSecundarioSena text-azulSena font-semibold flex items-center gap-1 px-2 py-1 rounded-md text-sm md:text-base">
                                <BookText size={20} /> <p>{totalClases} clases</p>
                            </div>
                            <div className="bg-azulSecundarioSena text-azulSena font-semibold flex items-center gap-1 px-2 py-1 rounded-md text-sm md:text-base">
                                <Clock size={20} /> <p>Duración: <span>10h 24m</span></p>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items center">
                            <button onClick={subscribe} className="w-full md:w-[200px] p-3 text-white rounded-lg font-semibold bg-[#00324D] hover:bg-black transition-all duration-200"> {isEnrolled ? "Continuar curso" : (
                                "¡Inscribirse!"
                            )}</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}