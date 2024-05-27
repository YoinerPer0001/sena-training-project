"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronDown, ChevronLeft, Edit, Link2, PlusCircleIcon, Save, Trash2, Video, X } from "lucide-react";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useParams } from 'next/navigation'

const Page = () => {
    const { courseId, classId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [modulos, setModulos] = useState([]);
    const [dataCourse, setDataCourse] = useState({});
    const [contenidoVisible, setContenidoVisible] = useState("");

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
                    console.log(response.data);
                    setModulos(response.data);
                    setIsLoading(false);
                } else {
                    alert('ups');
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    },[classId, courseId]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/cont_mod/${classId}`)
    },[modulos, classId])

    return (
        <>
            <section className="w-3/4 bg-black">
                <div className="flex justify-center items-center">
                    <CldVideoPlayer
                        width="1920"
                        height="1080"
                        src="https://res.cloudinary.com/dla5djfdc/video/upload/v1716317063/cursos/2024-03-03_22-18-01_fbbgg9.mkv"
                        className="rounded-lg w-3/4"
                    />
                </div>
            </section>
            <section className="w-1/4 p-2 overflow-y-auto text-white bg-gray-900 border-l-2 border-gray-700 relative">
                <div className="relative w-full flex justify-center gap-2 items-center">
                    <h4 className="font-bold text-xl text-center my-2">
                        Contenido del curso
                    </h4>
                    <button className="p-1 text-white hover:bg-black transition-all duration-150 rounded-lg">
                        <X />
                    </button>
                </div>
                <div className="w-full flex flex-col gap-2 items-center">
                    {modulos?.map((modulo, index) => (
                        <div key={modulo.Id_Mod} className="w-full">
                            <div onClick={() => toggleContenidoVisible(modulo.Id_Mod)} className="flex cursor-pointer flex-col group gap-3 items-start bg-white text-black p-3 rounded-lg w-full">
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-2 text-md font-semibold">Modulo {index + 1}: {modulo.Tit_Mod}</span>
                                    </div>
                                    <div>
                                        {contenidoVisible === modulo.Id_Mod ? <ChevronDown /> : <ChevronLeft />}
                                    </div>
                                </div>
                                {contenidoVisible === modulo.Id_Mod && modulo.Contenido_Modulos?.sort((a, b) => a.Indice_Cont - b.Indice_Cont).map((cont) => (
                                    <div className="flex flex-col gap-2 items-start w-full" key={cont.Id_Cont}>
                                        <div className={`flex cursor-pointer flex-col group gap-3 items-start border-1 border-gray-300 bg-gray-100 text-black p-2 rounded-lg w-full ${classId == cont.Id_Cont ? 'bg-verdeSena' : 'bg-white'}`}>
                                            <div className="flex items-center justify-between gap-2 w-full">
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-2 text-md font-semibold"><Video size={20} />{cont.Tit_Cont}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Page;
