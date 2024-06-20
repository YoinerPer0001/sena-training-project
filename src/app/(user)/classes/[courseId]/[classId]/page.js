'use client'
import React, { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronLeft, ClipboardCheck, Video, } from "lucide-react";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useParams } from 'next/navigation'
import Link from "next/link";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";
import VideoClass from "@/components/usersComponents/VideoClass/VideoClass";
import EvaluationSection from "@/components/usersComponents/EvaluationSection/EvaluationSection";

const Page = () => {
    const srcDefault = "https://res.cloudinary.com/dla5djfdc/video/upload/v1716317063/cursos/2024-03-03_22-18-01_fbbgg9.mkv";

    const { courseId, classId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataCourse, setDataCourse] = useState({});
    const [contenidoVisible, setContenidoVisible] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const token = authState.token;


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
                    const foundEvaluation = findEvaluation(response.data.Modulocursos, classId);
                    setEvaluation(foundEvaluation);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [courseId, classId]);

    const findEvaluation = (modulocursos, classId) => {
        for (const modulo of modulocursos) {
            // Buscar dentro de Contenido_Modulos
            const foundContent = modulo.Contenido_Modulos.find(content => content.Id_Cont === classId);
            if (foundContent && foundContent.Url_Cont) {
                setVideoSrc(foundContent.Url_Cont);
                setEvaluation(null)
                return foundContent;
            }
            // Buscar dentro de evaluacions
            const foundEvaluation = modulo.evaluacions.find(evaluacion => evaluacion.Id_Eva === classId);
            if (foundEvaluation) {
                console.log(foundEvaluation)
                setVideoSrc(null)
                return foundEvaluation;
            }
        }
        return null; // Si no se encuentra la evaluación
    };

    const checkClass = (Id_Cont) => {
        try {
            fetch('http://localhost:3000/api/v1/usuarios/contenido/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    Id_Cont: Id_Cont,
                }),
            })
                .then(response => response.json())
                .then(response => console.log(response))
        } catch (err) {
            console.log(err);
        }
    };

    return (
            <>
                {evaluation !== null && <EvaluationSection titEval={'Evaluacion'} evaluacion={evaluation} userId={user.Id_User} token={token}/>}
                {evaluation === null && videoSrc && <VideoClass src={videoSrc}/>}
                {/* <VideoClass /> */}
                <section className="w-full md:w-1/4 py-2 h-full overflow-y-auto bg-azulSena text-white  relative">
                    <div className="relative w-full flex justify-center gap-2 items-center">
                        <h4 className="font-semibold text-xl text-center my-2">
                            {dataCourse.Nom_Cur}
                        </h4>
                    </div>
                    <div className="w-full flex flex-col gap-2 p-4 items-center">
                        {dataCourse.Modulocursos?.map((modulo, index) => (
                            <div key={modulo.Id_Mod} className="w-full">
                                <div className="flex flex-col group gap-3 items-start bg-white shadow-md text-black p-3 rounded-lg w-full">
                                    <div className="flex items-center justify-between gap-2 w-full">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-2 text-md font-semibold">Modulo {index + 1}: {modulo.Tit_Mod}</span>
                                        </div>
                                        <div className="cursor-pointer" onClick={() => toggleContenidoVisible(modulo.Id_Mod)}>
                                            {contenidoVisible === modulo.Id_Mod ? <ChevronDown /> : <ChevronLeft />}
                                        </div>
                                    </div>
                                    {contenidoVisible === modulo.Id_Mod && <hr className="w-full" />}
                                    <div className={`${contenidoVisible === modulo.Id_Mod ? 'flex flex-col w-full gap-2 bg-white rounded-lg' : 'hidden'}`}>
                                        {modulo.Contenido_Modulos.concat(modulo.evaluacions || [])
                                            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                            .map((item) => {
                                                if (item.Tip_Cont && item.Url_Cont) {
                                                    return (
                                                        <Link key={item.Id_Cont} href={`./${item.Id_Cont}`} className={`flex cursor-pointer flex-col group gap-3 items-start sm:text-sm lg:text-base text-black p-3 rounded-lg w-full ${classId === item.Id_Cont ? 'bg-azulSecundarioSena text-azulSena hover:bg-azulSecundarioSena' : 'bg-white border hover:bg-gray-100'}`}>
                                                            <div className="flex items-center justify-between gap-2 w-full">
                                                                <div className="flex items-center w-full gap-4">
                                                                    <div className="flex items-center w-full justify-between gap-2 font-semibold">
                                                                        <span className="flex items-center gap-2 text-sm 2xl:text-base font-semibold">
                                                                            <Video size={20} />{item.Tit_Cont}
                                                                        </span>
                                                                        <button onClick={() => checkClass(item.Id_Cont)} className="text-gray-800 p-1 hover:bg-gray-400 transition-all duration-150 rounded-full bg-gray-200">
                                                                            <Check size={20} strokeWidth={2.5} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                } else if (item.Tit_Eva) {
                                                    return (
                                                        <Link href={`./${item.Id_Eva}`} key={item.Id_Eva} className={`flex cursor-pointer flex-col group gap-3 items-start sm:text-sm lg:text-base text-black p-3 rounded-lg w-full ${classId === item.Id_Eva ? 'bg-azulSecundarioSena text-azulSena hover:bg-azulSecundarioSena' : 'bg-white border hover:bg-gray-100'}`}>
                                                            <div className="flex items-center justify-between gap-2 w-full">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex items-center w-full justify-between gap-2 font-semibold">
                                                                        <span className="flex  items-center gap-2 text-sm 2xl:text-base font-semibold">
                                                                            <ClipboardCheck size={20} />{item.Tit_Eva}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </>
        )
};

export default Page;
