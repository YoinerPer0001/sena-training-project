'use client'
import React, { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronLeft, ClipboardCheck, Home, Video, X, } from "lucide-react";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useParams } from 'next/navigation'
import Link from "next/link";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";
import VideoClass from "@/components/usersComponents/VideoClass/VideoClass";
import EvaluationSection from "@/components/usersComponents/EvaluationSection/EvaluationSection";
import toast from "react-hot-toast";
import Image from "next/image";
import { SpinnerWhite } from "@/components/usersComponents/SpinnerWhite/Spinner";

const Page = () => {
    const srcDefault = "https://res.cloudinary.com/dla5djfdc/video/upload/v1716317063/cursos/2024-03-03_22-18-01_fbbgg9.mkv";

    const { courseId, classId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataCourse, setDataCourse] = useState({});
    const [contenidoVisible, setContenidoVisible] = useState("");
    const [intentosEval, setIntentosEval] = useState(null)
    const [resultadosEval, setResultadosEval] = useState(null)
    const [mostrarEval, setMostrarEval] = useState(false)
    const [evaluation, setEvaluation] = useState(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const token = authState.token;

    const toggleContenidoVisible = (indiceModulo) => {
        setContenidoVisible(prev => (prev === indiceModulo ? "" : indiceModulo));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/api/v1/courses/${courseId}`);
                const result = await response.json();

                if (result.type === 'success') {
                    setDataCourse(result.data);
                    const findEvaluation = (modulocursos, classId) => {
                        for (const modulo of modulocursos) {
                            // Buscar dentro de Contenido_Modulos
                            const foundContent = modulo.Contenido_Modulos.find(content => content.Id_Cont === classId);
                            if (foundContent && foundContent.Url_Cont) {
                                console.log(foundContent) // Debugging line
                                setVideoSrc(foundContent.Url_Cont);
                                setEvaluation(null);
                                setIsLoading(false);
                                return null; // Es una clase de tipo video, no evaluación
                            }
                            // Buscar dentro de evaluacions
                            const foundEvaluation = modulo.evaluacions.find(evaluacion => evaluacion.Id_Eva === classId);
                            if (foundEvaluation) {

                                fetch('http://localhost:3000/api/evaluations/user/result/list', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer " + token,
                                    },
                                    body: JSON.stringify({
                                        Id_Eval: foundEvaluation.Id_Eva,
                                        Id_User: user.Id_User,
                                    }),
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        if (response.type === 'success') {
                                            setIntentosEval(response.data.length);
                                            setResultadosEval(response.data);
                                        } else {
                                            toast.error("Error al obtener los intentos")
                                        }
                                    })
                                setVideoSrc(null);
                                setIsLoading(false);
                                console.log(foundEvaluation)
                                return foundEvaluation; // Es una evaluación
                            }
                        }
                        return null; // Si no se encuentra la evaluación ni el video
                    };
                    const foundEvaluation = findEvaluation(result.data.Modulocursos, classId);
                    setEvaluation(foundEvaluation);
                    // Set contenidoVisible based on the current class
                    const moduloId = findModuloId(result.data.Modulocursos, classId);
                    setContenidoVisible(moduloId);
                } else {
                    console.log('Error fetching course data:', result.message);
                }
            } catch (err) {
                console.log('Fetch error:', err);
            }
        };

        fetchData();
    }, [courseId, classId, token, user.Id_User]);

    const findModuloId = (modulocursos, classId) => {
        for (const modulo of modulocursos) {
            const foundContent = modulo.Contenido_Modulos.find(content => content.Id_Cont === classId);
            if (foundContent) {
                return modulo.Id_Mod;
            }
            const foundEvaluation = modulo.evaluacions.find(evaluacion => evaluacion.Id_Eva === classId);
            if (foundEvaluation) {
                return modulo.Id_Mod;
            }
        }
        return "";
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

    const handleMostrarEvalAgain = () => {
        setMostrarEval(true)
        setIntentosEval(0)
    }

    return (
        <>
            {isLoading ? <div className="h-screen w-screen bg-black flex items-center justify-center">
                <SpinnerWhite />
            </div> : (
                <>
                    {evaluation !== null && intentosEval === 0 && mostrarEval && <EvaluationSection titEval={'Evaluacion'} evaluacion={evaluation} userId={user.Id_User} token={token} />}
                    {evaluation === null && videoSrc && <VideoClass src={videoSrc} />}
                    {intentosEval > 0 && !mostrarEval && (<div className='w-full p-4 flex flex-col text-white items-center justify-center lg:w-3/4 h-auto md:h-screen bg-black'>
                        <div className="p-4 border-2 rounded-lg border-white flex flex-col items-center">
                            <Image className="my-2" src={'/logo-senalearn-(white).png'} width={50} height={50} alt={'Logo SENALEARN blanco'} />
                            <h3 className="font-semibold text-2xl">Evaluación completada</h3>
                            <h4>Ya realizaste esta la evaluacion. Has hecho <span className="font-semibold text-lg">{intentosEval}</span> {intentosEval == 1 ? 'intento.' : 'intentos.'}</h4>
                            <div className="flex items-center gap-2">
                                <p>Ultima calificación: {resultadosEval[intentosEval - 1].Puntuacion * 10}/100</p>
                                {resultadosEval[intentosEval - 1].Puntuacion * 10 >= resultadosEval[intentosEval - 1].evaluacion.Not_Min_Apr_Eva ? <div className="bg-verdeSena rounded-full text-white"><Check size={17} /></div> : <div className="bg-red-600 rounded-full text-white"><X size={17} /></div>}
                            </div>
                            <button onClick={handleMostrarEvalAgain} className="bg-azulSecundarioSena hover:bg-azulSena hover:text-azulSecundarioSena transition-all duration-150 text-azulSena p-2 rounded-lg font-semibold my-4">Intentar de nuevo</button>
                        </div>
                    </div>)}
                    <section className="w-full lg:w-1/4 py-2 h-full overflow-y-auto bg-azulSena text-white relative">
                        <div className="relative w-full flex flex-col xl:flex-row justify-center gap-1 xl:gap-2 my-2 items-center">
                            <h4 className="font-semibold text-xl text-center">
                                {dataCourse.Nom_Cur}
                            </h4>
                            <Link href={'/'} className="text-sm mt-1 flex items-center gap-1 font-medium bg-black/30 p-1 rounded-lg hover:bg-black transition-all duration-150">Volver al inicio</Link>
                        </div>
                        <div className="w-full flex flex-col gap-2 p-4 items-center">
                            {dataCourse.Modulocursos?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((modulo, index) => (
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
                                                                            <span className="flex items-center gap-2 text-sm 2xl:text-base font-semibold">
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
            )}
        </>
    )
};

export default Page;
