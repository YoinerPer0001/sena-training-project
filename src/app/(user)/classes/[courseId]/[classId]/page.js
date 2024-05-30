"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronDown, ChevronLeft, Edit, Link2, PlusCircleIcon, Save, Trash2, Video, X } from "lucide-react";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useParams } from 'next/navigation'
import Link from "next/link";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";

const Page = () => {

    const srcDefault = "https://res.cloudinary.com/dla5djfdc/video/upload/v1716317063/cursos/2024-03-03_22-18-01_fbbgg9.mkv"
    
    const { courseId, classId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [modulos, setModulos] = useState([]);
    const [dataCourse, setDataCourse] = useState({});
    const [contenidoVisible, setContenidoVisible] = useState("");
    const [videoSrc, setVideoSrc] = useState(srcDefault);


    const toggleContenidoVisible = (indiceModulo) => {
        setContenidoVisible(prev => (prev === indiceModulo ? "" : indiceModulo));
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/api/v1/courses/${courseId}`)
            .then(response => response.json())
            .then(response => {
                if (response.type === 'success') {
                    setDataCourse(response.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });

    }, [courseId]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/modulo_curso/${courseId}`)
            .then(response => response.json())
            .then(response => {
                if (response.type === 'success') {
                    const data = response.data;
                    console.log(data);
                    setModulos(data);
                    
                    // Buscar el contenido con el Id_Cont igual a classId
                    const contenido = data.find(modulo => modulo.Contenido_Modulos.some(contenido => contenido.Id_Cont === classId));
                    console.log(contenido);
                    
                    // Verificar si se encontró el contenido y si tiene una URL definida
                    if (contenido && contenido.Contenido_Modulos && contenido.Contenido_Modulos.length > 0) {
                        const contenidoSeleccionado = contenido.Contenido_Modulos.find(cont => cont.Id_Cont === classId);
                        console.log(contenidoSeleccionado);
                        if (contenidoSeleccionado && contenidoSeleccionado.Url_Cont) {
                            setVideoSrc(contenidoSeleccionado.Url_Cont);
                            setIsLoading(false);
                        } else {
                            setVideoSrc(srcDefault);
                            setIsLoading(false);
                        }
                    } else {
                        setVideoSrc(srcDefault);
                        setIsLoading(false);
                    }
                } else {
                    alert('Ups');
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [classId, courseId]);

    return (
        isLoading ? <div className="h-screen w-screen flex justify-center items-center"><Spinner /></div> : (
            <>
            <section className="w-3/4 bg-black">
                <div className="flex justify-center items-center">
                    <CldVideoPlayer
                        width="1280"
                        height="720"
                        src={videoSrc}
                        className="rounded-lg w-3/4"
                    />
                </div>
            </section>
            <section className="w-1/4 py-2 overflow-y-auto bg-white border-l-2 border-gray-700 relative">
                <div className="relative w-full flex justify-center gap-2 items-center">
                    <h4 className="font-bold text-xl text-center my-2">
                        Contenido del curso
                    </h4>
                    <button className="p-1 text-black hover:bg-black hover:text-white transition-all duration-150 rounded-lg">
                        <X />
                    </button>
                </div>
                <div className="w-full flex flex-col gap-2 items-center">
                    {modulos?.map((modulo, index) => (
                        <div key={modulo.Id_Mod} className="w-full">
                            <div onClick={() => toggleContenidoVisible(modulo.Id_Mod)} className="flex cursor-pointer flex-col group gap-3 items-start bg-azulSena text-white p-3 rounded-lg w-full">
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-2 text-md font-semibold">Modulo {index + 1}: {modulo.Tit_Mod}</span>
                                    </div>
                                    <div>
                                        {contenidoVisible === modulo.Id_Mod ? <ChevronDown /> : <ChevronLeft />}
                                    </div>
                                </div>
                                <div className={`${contenidoVisible === modulo.Id_Mod ? 'flex flex-col w-full bg-white rounded-lg' : 'hidden'}`}>
                                    {contenidoVisible === modulo.Id_Mod && modulo.Contenido_Modulos?.sort((a, b) => a.Indice_Cont - b.Indice_Cont).map((cont) => (
                                        <>
                                            <div key={cont.Id_Cont} className={`flex cursor-pointer flex-col group gap-3 items-start odd:bg-white even:bg-gray-200 sm:text-sm lg:text-base shadow-sm text-black p-3 rounded-lg  w-full ${classId == cont.Id_Cont ? 'bg-azulSecundarioSena text-azulSena' : 'bg-white'}`}>
                                                <div className="flex items-center justify-between gap-2 w-full">
                                                    <div className="flex items-center gap-4">
                                                        <Link href={`./${cont.Id_Cont}`} className="flex items-center gap-2 text-md font-semibold"><Video size={20} />{cont.Tit_Cont}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
        )
    );
};

export default Page;