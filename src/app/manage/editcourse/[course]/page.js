"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
    AlertCircle,
    ArrowLeftToLine,
    BookCheck,
    Check,
    ChevronDown,
    ChevronLeft,
    CircleFadingPlus,
    ClipboardCheck,
    Dot,
    Edit,
    Eye,
    File,
    FileCheck,
    ImagePlus,
    Info,
    Link2,
    LucideListPlus,
    Plus,
    PlusCircle,
    PlusCircleIcon,
    Save,
    Trash2,
    Upload,
    Video,
    X,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { v4 as uuidv4 } from "uuid";
import { AddQuestions } from "@/utils/utils";
import useContentCourseHandlers from "@/hooks/useContentCourseHandlers";
import useEditCourse from "@/utils/editCourseFunctions/editCourseInputs/editCourseInputs";
import UploadButtonWidget from "@/components/instructorsComponents/UploadButtonWidget/UploadButtonWidget";
import CreateQuiz from "@/components/instructorsComponents/CreateQuiz/CreateQuiz";


export default function ManageCourses() {
    const router = useRouter();

    const [categories, setCategories] = useState();
    const [dataCourse, setDataCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(2);

    const [requisitosDB, setRequisitosDB] = useState([])
    const [objetivosDB, setObjetivosDB] = useState([]);

    const { course } = useParams()
    const idCourse = course;
    const token = getCookie("sessionToken");


    const {
        nuevoNombreModulo,
        mostrarAgregarModulo,
        setNuevoNombreModulo,
        setMostrarAgregarModulo,
        agregarModulo,
        eliminarClase,
        createClass,
        handleCreateClick,
        handleEditClick,
        editIndexMod,
        createIndexClass,
        setCreateNameClass,
        setCreateIndexClass,
        subirVideoContenido,
        dataCourse2
    } = useContentCourseHandlers(token, idCourse)
    console.log(dataCourse2)

    const { editCourse, handleChangeName, handleChangeDes, handleChangeCat } = useEditCourse();


    useEffect(() => {
        // FETCH CATEGORÍAS
        fetch("http://localhost:3000/api/v1/categories")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const categories = data.data.map(category => ({
                    id: category.Id_Cat,
                    name: category.Nom_Cat,
                }));
                setCategories(categories);
            })
            .catch(error => console.error("Error fetching categories:", error));

        // FETCH INFORMACIÓN DEL CURSO
        fetch(`http://localhost:3000/api/v1/courses/${idCourse}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const course = data.data;
                setDataCourse(course);
            })
            .catch(error => console.error("Error fetching course:", error));

        // OBJETIVOS DEL CURSO
        fetch(`http://localhost:3000/api/v1/obj_cursos/${idCourse}`)
            .then(response => response.json())
            .then(response => {
                const data = response.data;
                if (data.length > 0) {
                    const objCursos = data.map(obj => {
                        return {
                            IdObj: obj.Id_Objetivo,
                            Desc_Objetivo: obj.Desc_Objetivo,
                            ESTADO_REGISTRO: obj.ESTADO_REGISTRO
                        };
                    });
                    setObjetivosDB(objCursos);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
        fetch(`http://localhost:3000/api/v1/curso/req-previos/${idCourse}`)
            .then(response => response.json())
            .then(response => {
                const data = response.data;
                if (data.length > 0) {
                    const requisitos = data.map(req => {
                        return {
                            IdReq: req.Id_Req,
                            Desc_Req: req.Desc_Req,
                            ESTADO_REGISTRO: req.ESTADO_REGISTRO
                        };
                    });
                    setRequisitosDB(requisitos);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
    }, [idCourse]);

    useEffect(() => {
        if (dataCourse2) {
            setLoading(false)
        }
    }, [dataCourse2]);

    const handleClickPage1 = () => {
        setPage(1);
    };
    const handleClickPage2 = () => {
        setPage(2);
    };


    const functionEditCourse = () => {
        try {
            if (
                Object.keys(editCourse).length === 0 &&
                editCourse.constructor === Object &&
                requisitos.length === 0 &&
                objetivos.length === 0 &&
                objetivos[0].Desc_Objetivo == ""
            ) {
                console.log("editCourse está vacío, no se ejecutará el fetch.");
                return toast(
                    <div className="rounded-lg p-2 flex items-center justify-center gap-1 text-black">
                        <Info /> No hay nada para guardar
                    </div>
                );
            }

            fetch(`http://localhost:3000/api/v1/courses/update/${idCourse}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editCourse),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.type === "success") {
                        toast.success("Se guardaron los cambios correctamente");
                        return router.refresh();
                    } else {
                        toast.error("Hubo un error al guardar los cambios");
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            fetchAgregarObjetivos();
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    // AGREGAR REQUISITO
    const [requisitos, setRequisitos] = useState([]);
    const [editRequisito, setEditRequisito] = useState('');
    const [reqEditId, setReqEditId] = useState('');

    const agregarRequisito = () => {
        setRequisitos([...requisitos, { IdReq: uuidv4(), Desc_Req: "" }]);
    };

    const handleChange = (index, value) => {
        const nuevosRequisitos = [...requisitos];
        nuevosRequisitos[index] = { ...nuevosRequisitos[index], Desc_Req: value };
        setRequisitos(nuevosRequisitos);
    };

    const handleChangeReqEdit = (value) => {
        setEditRequisito(value);
    };

    const fetchEditarRequisito = async (id) => {
        if (editRequisito === '') {
            toast.error('El requisito no puede estar vacío.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/v1/curso/req-previos/update/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Desc_Req: editRequisito,
                }),
            });
            const data = await response.json();
            if (data.type === "success") {
                setRequisitosDB(prevRequisitosDB =>
                    prevRequisitosDB.map(req =>
                        req.IdReq === id ? { ...req, Desc_Req: editRequisito } : req
                    )
                );
                toast.success("Se guardaron los cambios correctamente");
                setEditRequisito('');
                setReqEditId('');
                router.refresh();
            } else {
                toast.error("Hubo un error al guardar los cambios");
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Hubo un error al comunicarse con el servidor");
        }
    };

    const fetchAgregarRequisitos = async () => {
        if (requisitos.some(req => req.Desc_Req === "")) {
            toast.error('No se pueden agregar requisitos con descripción vacía');
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/v1/curso/req-previos/create", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requisitos: requisitos,
                    Id_Cur: idCourse,
                }),
            });
            const data = await response.json();
            if (data.type === 'success') {
                toast.success("Se guardaron los cambios correctamente");
                // Mapear los requisitos agregados para incluir ESTADO_REGISTRO y actualizar el estado local
                const nuevosRequisitos = requisitos.map(req => ({
                    ...req,
                    ESTADO_REGISTRO: 1, // Asumimos que los nuevos requisitos tienen estado 1
                }));
                setRequisitosDB(prevRequisitosDB => [...prevRequisitosDB, ...nuevosRequisitos]);
                setRequisitos([]);
            } else {
                toast.error("Hubo un error al guardar los cambios");
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Hubo un error al comunicarse con el servidor");
        }
    };

    const fetchEliminarRequisito = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/curso/req-previos/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.type === "success") {
                setRequisitosDB(prevRequisitosDB =>
                    prevRequisitosDB.filter(req => req.IdReq !== id)
                );
                toast.success("Se eliminó correctamente");
            } else {
                toast.error("Hubo un error al eliminar el requisito");
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Hubo un error al comunicarse con el servidor");
        }
    };

    const eliminarRequisito = index => {
        const nuevosRequisitos = [...requisitos];
        nuevosRequisitos.splice(index, 1);
        setRequisitos(nuevosRequisitos);
    };


    // AGREGAR OBJETIVOS

    const [objetivos, setObjetivos] = useState([]);
    const [editObjetivo, setEditObjetivo] = useState('');
    const [objEditId, setObjEditId] = useState('');

    const agregarObjetivo = () => {
        setObjetivos([...objetivos, { IdObj: uuidv4(), Desc_Objetivo: "" }]);
        console.log(objetivos);
    };

    const handleChangeObjEdit = (value) => {
        setEditObjetivo(value);
    };

    const handleChangeObj = (index, value) => {
        const nuevosObjetivos = [...objetivos];
        nuevosObjetivos[index] = { ...nuevosObjetivos[index], Desc_Objetivo: value };
        setObjetivos(nuevosObjetivos);
    };

    const eliminarObjetivo = index => {
        const nuevosObjetivos = [...objetivos];
        nuevosObjetivos.splice(index, 1);
        setObjetivos(nuevosObjetivos);
    };

    const fetchAgregarObjetivos = () => {
        if (objetivos.some(req => req.Desc_Objetivo === "")) {
            toast.error('No se pueden agregar objetivos con descripción vacía');
            return;
        }
        try {

            fetch("http://localhost:3000/api/v1/obj_cursos/create", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    objetivos: objetivos,
                    Id_Cur: idCourse,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.type === 'success') {
                        toast.success("Se guardaron los cambios correctamente");
                        // Mapear los requisitos agregados para incluir ESTADO_REGISTRO y actualizar el estado local
                        const nuevosObjetivos = objetivos.map(obj => ({
                            ...obj,
                            ESTADO_REGISTRO: 1, // Asumimos que los nuevos requisitos tienen estado 1
                        }));
                        setObjetivosDB(prevObjetivosDB => [...prevObjetivosDB, ...nuevosObjetivos]);
                        setObjetivos([]);
                    } else {
                        toast.error("Hubo un error al guardar los cambios");
                    }
                });
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    const fetchEditarObjetivo = async (id) => {
        if (editObjetivo === '') {
            toast.error('El requisito no puede estar vacío.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/v1/obj_cursos/update/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Desc_Objetivo: editObjetivo,
                }),
            });
            const data = await response.json();
            if (data.type === "success") {
                setObjetivosDB(prevObjetivosDB =>
                    prevObjetivosDB.map(obj =>
                        obj.IdObj === id ? { ...obj, Desc_Objetivo: editObjetivo } : obj
                    )
                );
                toast.success("Se guardaron los cambios correctamente");
                setEditObjetivo('');
                setObjEditId('');
                router.refresh();
            } else {
                toast.error("Hubo un error al guardar los cambios");
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Hubo un error al comunicarse con el servidor");
        }
    };


    // SUBIR IMAGEN
    let image = null;
    const [progressBar, setProgressBar] = useState(false);

    const formSubmit = async ({ files }) => {
        const [file] = files;
        const form = new FormData();
        form.append("file", file);
        setProgressBar(true);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: form
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            image = data.file;

            if (data.message === "File uploaded successfully" && image) {
                const updateResponse = await fetch(
                    `http://localhost:3000/api/v1/courses/update/${idCourse}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ Fot_Cur: image }),
                    }
                );

                const updateData = await updateResponse.json();

                if (updateData.type === "success") {
                    setProgressBar(false);
                    toast.success("Se guardo la imagen correctamente.");
                    return location.reload();
                } else {
                    setProgressBar(false);
                    console.error("Failed to update course with image:", updateData);
                }
            } else {
                setProgressBar(false);
                console.error("No se cargo la imagen");
            }
        } catch (e) {
            setProgressBar(false);
            console.error("Error during form submission: ", e);
        }
    };

    const [subirImagen, setSubirImagen] = useState(
        dataCourse.Fot_Cur === null ? true : false
    );

    const [contenidoVisible, setContenidoVisible] = useState("");
    const toggleContenidoVisible = (indiceClase) => {
        if (indiceClase == contenidoVisible) {
            setContenidoVisible("");
        } else {
            setContenidoVisible(indiceClase)
        }
    };

    // MOSTRAR CREAR EVALUACION
    const [crearEvaluacion, setCrearEvaluacion] = useState('');
    const handleClickCrearEvaluacion = (idMod) => {
        console.log(idMod, crearEvaluacion)
        if (idMod == crearEvaluacion) {
            setCrearEvaluacion('')
        } else {
            setCrearEvaluacion(idMod);
        }
    };

    // MOSTRAR AGREGAR PREGUNTA
    const [addQuestionForm, setQuestionForm] = useState('');

    const handleShowAddQuestionForm = (idEva) => {
        if (idEva == addQuestionForm) {
            setQuestionForm('')
        } else {
            setQuestionForm(idEva);
        }
    }

    const [question, setQuestion] = useState('');
    const handleChangeQuestion = (e) => {
        setQuestion(e.target.value);
        console.log
    }

    const [answers, setAnswers] = useState({
        "Id_Preg_Eval": null,
        "Respuestas": []
    });

    const handleChangeAnswers = (event) => {
        const { id, value } = event.target; // Obtén el ID y el valor del input
        const index = parseInt(id, 10); // Convierte el ID a un número, asumiendo que ID es un índice

        setAnswers(prev => {
            // Crea una copia del estado anterior
            const updatedRespuestas = [...prev.Respuestas];
            // Si el índice no existe, inicialízalo con un objeto vacío
            if (!updatedRespuestas[index]) {
                updatedRespuestas[index] = {
                    Text_Resp_Eval: '',
                    Resp_Correcta_Eval: 0
                };
            }
            // Actualiza la propiedad 'Text_Resp_Eval' del objeto en el índice correspondiente
            updatedRespuestas[index].Text_Resp_Eval = value;
            return {
                ...prev,
                Respuestas: updatedRespuestas
            };
        });

        console.log(answers); // Asumiendo que dataQuestion es otro estado o variable
    }

    const handleSelectChange = (event) => {
        const { value } = event.target;

        setAnswers(prev => ({
            ...prev,
            Respuestas: prev.Respuestas.map((respuesta, index) => ({
                ...respuesta,
                Resp_Correcta_Eval: index === parseInt(value) ? 1 : 0
            }))
        }));
        console.log(answers); // Asumiendo que dataQuestion es otro estado o variable
    };

    ////////////////
    if (!dataCourse2) {
        return <div className="w-full h-full flex justify-center items-center">
            <Spinner />
        </div>;
    }

    return (
        <div className="bg-gray-100 flex flex-col h-full gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
            {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <div className="relative flex items-center justify-center">
                        <div className="flex">
                            <button
                                className={`font-semibold text-base text-center rounded-bl-lg rounded-tl-lg p-3 ${page == 1
                                    ? "text-white bg-azulSena"
                                    : "text-azulSena bg-white"
                                    }`}
                                onClick={handleClickPage1}
                            >
                                Información básica
                            </button>
                            <button
                                className={`font-semibold text-base text-center p-3 rounded-tr-lg rounded-br-lg ${page == 1
                                    ? "text-azulSena bg-white"
                                    : "text-white bg-azulSena"
                                    }`}
                                onClick={handleClickPage2}
                            >
                                Crear contenido
                            </button>
                        </div>
                        <div className="absolute left-0 flex items-center justify-start">
                            <Link
                                className="my-auto transition-all duration-150 flex items-center gap-2 hover:bg-gray-300 p-2 rounded-lg font-medium"
                                href={"/instructors/content"}
                            >
                                <ArrowLeftToLine /> Volver
                            </Link>
                        </div>
                    </div>
                    <hr className="w-full my-5" />
                    {page === 1 && (
                        <div>
                            <form
                                className="my-4 flex flex-col max-w-[1024px] w-full lg:w-full gap-8 mx-auto text-sm md:text-base font-medium"
                                onSubmit={e => e.preventDefault()}
                            >
                                <div className="flex flex-col gap-1">
                                    <label className="font-semibold text-lg">
                                        Nombre del curso
                                    </label>
                                    <input
                                        type="text"
                                        name="Nom_Cur"
                                        onChange={handleChangeName}
                                        className="p-2 rounded-lg border-1 outline-none focus:border-azulSena border-gray-200 placeholder-gray-400"
                                        placeholder="Introduce el nombre del curso."
                                        defaultValue={dataCourse.Nom_Cur}
                                    />
                                    <span className="text-xs ml-1 text-gray-500">
                                        El nombre del curso debe tener máximo 50
                                        palabras.
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-semibold text-lg">
                                        Descripción
                                    </label>
                                    <input
                                        type="text"
                                        name="Des_Cur"
                                        onChange={handleChangeDes}
                                        className="p-2 rounded-lg border-1 outline-none focus:border-azulSena border-gray-200 placeholder-gray-400"
                                        placeholder="Introduce el la descripción del curso."
                                        defaultValue={dataCourse.Des_Cur}
                                    />
                                    <span className="text-xs ml-1 text-gray-500">
                                        La descripción debe tener máximo 100
                                        palabras.
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-semibold text-lg">
                                        Categoría
                                    </label>
                                    <select
                                        defaultValue={dataCourse.Id_Cat_FK}
                                        onChange={handleChangeCat}
                                        className="rounded-lg p-2 outline-none border-1 border-gray-200 cursor-pointer focus:border-azulSena"
                                    >
                                        <option value="0">
                                            - Selecciona una categoría -
                                        </option>
                                        {categories &&
                                            categories.map(category => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                    {editCourse.Id_Cat_FK &&
                                        editCourse.Id_Cat_FK == 0 ? (
                                        <div className="text-red-500 p-2 font-medium text-sm pt-0 pl-1 flex gap-1 items-center">
                                            <AlertCircle size={18} /> Debes
                                            escoger una categoría.
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <span className="text-xs ml-1 text-gray-500">
                                        Escoge la categoría que mejor se adapte
                                        a tu curso.
                                    </span>
                                </div>
                                <div className="w-full flex flex-col items-start gap-2">
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-lg">
                                            Requisitos previos
                                        </label>
                                        <p>
                                            Haz una lista de todas las
                                            habilidades, herramientas,
                                            experiencia y equipos necesarios que
                                            los alumnos deberían tener antes de
                                            realizar tu curso.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        {requisitosDB
                                            .filter(requisito => requisito.ESTADO_REGISTRO === 1)
                                            .map((requisito, index) => (
                                                <div key={requisito.IdReq} className="flex gap-2 group">
                                                    {requisito.IdReq !== reqEditId ? (
                                                        <span className="flex items-center border min-w-2/4 w-full border-gray-300 rounded-lg gap-1 p-2">
                                                            {/* Asegúrate de que el componente Dot esté importado */}
                                                            <Dot size={24} color='#b0b0b0' /> {requisito.Desc_Req}
                                                        </span>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            defaultValue={requisito.Desc_Req}
                                                            placeholder="Ej: Tener acceso a internet."
                                                            onChange={e => handleChangeReqEdit(e.target.value)}
                                                            className="rounded-lg w-full p-2 outline-none border-1 border-gray-300 focus:border-azulSena flex-1"
                                                        />
                                                    )}
                                                    <div className="flex opacity-100 sm:opacity-0 items-center gap-2 sm:group-hover:opacity-100">
                                                        {requisito.IdReq !== reqEditId ? (
                                                            <button
                                                                onClick={() => setReqEditId(requisito.IdReq)}
                                                                className="bg-azulSena text-white p-1 hover:bg-black transition-all duration-150 rounded-lg"
                                                            >
                                                                <Edit size={19} />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => fetchEditarRequisito(requisito.IdReq)}
                                                                className="bg-azulSena text-white p-1 hover:bg-black transition-all duration-150 rounded-lg"
                                                            >
                                                                <Check size={19} />
                                                            </button>
                                                        )}
                                                        <button
                                                            className="bg-red-500 text-white p-1 hover:bg-red-600 transition-all duration-150 rounded-lg"
                                                            onClick={() => fetchEliminarRequisito(requisito.IdReq)}
                                                        >
                                                            <Trash2 size={19} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        {requisitos.map((requisito, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={requisito.Desc_Req}
                                                    placeholder="Ej: Tener acceso a internet."
                                                    onChange={e => handleChange(index, e.target.value)}
                                                    className="rounded-lg w-full p-2 outline-none border-1 border-gray-300 focus:border-azulSena flex-1"
                                                />
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="bg-red-500 text-white p-2 hover:bg-red-600 transition-all duration-150 rounded-lg"
                                                        onClick={() => eliminarRequisito(index)}
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="text-azulSena flex items-center gap-1 font-semibold transition-all duration-150 p-2 rounded-lg hover:bg-gray-300"
                                            onClick={agregarRequisito}
                                        >
                                            <Plus /> Agregar requisito
                                        </button>
                                        <button onClick={fetchAgregarRequisitos} disabled={requisitos.length > 0 ? false : true} className="bg-azulSena disabled:cursor-not-allowed disabled:bg-gray-600 flex items-center gap-1 text-white hover:bg-black transition-all duration-150 p-2 rounded-lg">
                                            <Save size={20} /> Guardar
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-start gap-2">
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-lg">
                                            Objetivos del curso
                                        </label>
                                        <p>
                                            Enumera los objetivos que deseas que
                                            los estudiantes alcancen al
                                            finalizar tu curso. Debe haber al
                                            menos 1 objetivo.
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-col gap-2 items-start">
                                        {objetivosDB
                                            .filter(objetivo => objetivo.ESTADO_REGISTRO === 1)
                                            .map((objetivo, index) => (
                                                <div key={objetivo.IdObj} className="flex gap-2 group w-full">
                                                    {objetivo.IdObj !== objEditId ? (
                                                        <span className="flex items-center border min-w-2/4 w-full border-gray-300 rounded-lg gap-1 p-2">
                                                            {/* Asegúrate de que el componente Dot esté importado */}
                                                            <Dot size={24} color='#b0b0b0' /> {objetivo.Desc_Objetivo}
                                                        </span>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            defaultValue={objetivo.Desc_Objetivo}
                                                            placeholder="Ej: Tener acceso a internet."
                                                            onChange={e => handleChangeObjEdit(e.target.value)}
                                                            className="rounded-lg w-full p-2 outline-none border-1 border-gray-300 focus:border-azulSena flex-1"
                                                        />
                                                    )}
                                                    <div className="flex opacity-100 sm:opacity-0 items-center gap-2 sm:group-hover:opacity-100">
                                                        {objetivo.IdObj !== objEditId ? (
                                                            <button
                                                                onClick={() => setObjEditId(objetivo.IdObj)}
                                                                className="bg-azulSena text-white p-1 hover:bg-black transition-all duration-150 rounded-lg"
                                                            >
                                                                <Edit size={19} />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => fetchEditarObjetivo(objetivo.IdObj)}
                                                                className="bg-azulSena text-white p-1 hover:bg-black transition-all duration-150 rounded-lg"
                                                            >
                                                                <Check size={19} />
                                                            </button>
                                                        )}
                                                        <button
                                                            className="bg-red-500 text-white p-1 hover:bg-red-600 transition-all duration-150 rounded-lg"
                                                            onClick={() => fetchEliminarRequisito(objetivo.IdObj)}
                                                        >
                                                            <Trash2 size={19} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        {objetivos.map((objetivo, index) => (
                                            <div key={objetivo.IdObj} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={objetivo.Desc_Req}
                                                    placeholder="Ej: Tener acceso a internet."
                                                    onChange={e => handleChangeObj(index, e.target.value)}
                                                    className="rounded-lg w-full p-2 outline-none border-1 border-gray-300 focus:border-azulSena flex-1"
                                                />
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="bg-red-500 text-white p-2 hover:bg-red-600 transition-all duration-150 rounded-lg"
                                                        onClick={() => eliminarObjetivo(index)}
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="text-azulSena flex items-center gap-1 font-semibold transition-all duration-150 p-2 rounded-lg hover:bg-gray-300"
                                                onClick={agregarObjetivo}
                                            >
                                                <Plus /> Agregar objetivo
                                            </button>
                                            <button onClick={fetchAgregarObjetivos} disabled={objetivos.length > 0 ? false : true} className="bg-azulSena disabled:cursor-not-allowed disabled:bg-gray-600 flex items-center gap-1 text-white hover:bg-black transition-all duration-150 p-2 rounded-lg">
                                                <Save size={20} /> Guardar
                                            </button>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-lg">
                                        Portada del curso
                                    </label>
                                    <div className="flex gap-2 justify-center flex-col items-start">
                                        <p>El tamaño recomendado es de 1280x720. La imagen se recortara automáticamente a este tamaño.</p>
                                        {subirImagen === true ||
                                            dataCourse.Fot_Cur === null ? (
                                            <>
                                                <div className="card w-full">
                                                    <FileUpload
                                                        pt={{
                                                            badge: "w-0",
                                                            root: "py-4",
                                                            message:
                                                                "bg-red-200 text-red-500 p-2 rounded-lg",
                                                            thumbnail: "rounded-lg",
                                                            details:
                                                                "p-2 rounded-lg w-full",
                                                            fileName:
                                                                "font-semibold",
                                                            cancelIcon:
                                                                "bg-red-200 text-red-500",
                                                            file: "bg-white rounded-lg p-2 mt-2",
                                                            progressbar:
                                                                "h-4 w-full rounded-full",
                                                        }}
                                                        previewWidth={100}
                                                        invalidFileSizeMessageDetail="El tamaño máximo es de 976.563 KB."
                                                        chooseOptions={{
                                                            label: "Escoger",
                                                            icon: <Plus />,
                                                            className:
                                                                "p-2 bg-azulSena flex items-center gap-1 cursor-pointer hover:bg-black transition-all duration-150 mr-2 text-white rounded-lg",
                                                        }}
                                                        uploadOptions={{
                                                            label: "Subir",
                                                            icon: (
                                                                <Upload size={20} />
                                                            ),
                                                            className:
                                                                "p-2 bg-azulSena disabled:cursor-not-allowed disabled:bg-gray-600 flex items-center gap-1 cursor-pointer hover:bg-black transition-all duration-150 mr-2 text-white rounded-lg",
                                                        }}
                                                        cancelOptions={{
                                                            label: "Cancelar",
                                                            icon: <X size={20} />,
                                                            className:
                                                                "p-2 bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-600 flex items-center gap-1 cursor-pointer hover:bg-red-600 transition-all duration-150 mr-2 text-white rounded-lg",
                                                        }}
                                                        onUpload={() => { router.push("/") }}
                                                        removeIcon={<XCircle />}
                                                        name="files"
                                                        className="w-full"
                                                        customUpload={true}
                                                        uploadHandler={formSubmit}
                                                        accept="image/*"
                                                        maxFileSize={1000000}
                                                        emptyTemplate={
                                                            <p className="mt-4 p-10 border-1 border-azulSena rounded-lg text-center flex items-center gap-2 text-azulSena justify-center">
                                                                <ImagePlus />{" "}
                                                                Arrastre y suelte
                                                                archivos aquí para
                                                                cargarlos.
                                                            </p>
                                                        }
                                                    />
                                                </div>
                                                {progressBar && <div className="card">
                                                    <ProgressBar color="#39a900" pt={{ container: 'bg-azulSena', root: 'bg-gray-300 rounded-lg' }} mode="indeterminate" style={{ height: '6px', width: '250px' }}></ProgressBar>
                                                </div>}
                                            </>
                                        ) : (
                                            <div className="w-full flex flex-col gap-2 items-center">
                                                <Image
                                                    src={dataCourse.Fot_Cur}
                                                    alt="Foto del curso"
                                                    className="rounded-lg"
                                                    width={500}
                                                    height={400}
                                                />
                                            </div>
                                        )}

                                        {dataCourse.Fot_Cur !== null && (
                                            <button
                                                className="p-2 hover:bg-black transition-all duration-150 bg-azulSena rounded-lg text-white"
                                                onClick={() => setSubirImagen(!subirImagen)}
                                            >
                                                {subirImagen ? "Cancelar" : "Cambiar Portada"}
                                            </button>
                                        )}

                                        {subirImagen && dataCourse.Fot_Cur === null && (
                                            <button
                                                className="p-2 hover:bg-black transition-all duration-150 bg-azulSena rounded-lg text-white"
                                                onClick={() => setSubirImagen(false)}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* BOTÓN DE GUARDAR CAMBIOS */}
                                <button
                                    onClick={functionEditCourse}
                                    disabled={
                                        editCourse.Id_Cat_FK &&
                                        editCourse.Id_Cat_FK == 0
                                    }
                                    className="bg-azulSena transition-all duration-150 disabled:cursor-not-allowed disabled:bg-gray-600 p-2 rounded-lg flex items-center gap-1 justify-center text-white my-2"
                                >
                                    <Save size={20} /> Guardar
                                </button>
                            </form>
                        </div>
                    )}
                    {page === 2 && (
                        <form
                            className="my-4 flex flex-col max-w-[1024px] w-full sm:w-[1024px] lg:w-[1024px] gap-8 mx-auto"
                            onSubmit={e => e.preventDefault()}
                        >
                            <div className="flex flex-col gap-2 items-center">
                                <div className="p-3 border-1 border-azulSena rounded-lg font-semibold flex items-center gap-2 justify-center w-full">
                                    <AlertCircle />
                                    <p>
                                        Añade aquí el contenido del curso, como
                                        clases, secciones del curso, tareas y
                                        mucho más.
                                    </p>
                                </div>
                                <p className="font-medium">
                                    Empieza a dar forma a tu curso creando
                                    secciones, clases y actividades prácticas
                                    (cuestionarios, ejercicios de codificación y
                                    tareas). Utiliza el esquema del curso para
                                    estructurar el contenido y etiqueta
                                    claramente tus secciones y clases.
                                </p>
                            </div>
                            <div>
                                <div className="flex flex-col gap-5">
                                    {dataCourse2.Modulocursos?.map((modulo, indiceModulo) => (
                                        <div
                                            key={indiceModulo}
                                            className="border-1 border-azulSena p-3 rounded-lg bg-white"
                                        >
                                            <div className="my-2 flex group items-center gap-2 flex-wrap">
                                                <div>
                                                    {editIndexMod === modulo.Id_Mod ? (<div className="flex items-center gap-2 mx-2">
                                                        <span className="font-semibold">Modulo: </span>
                                                        <input className="p-2 rounded-lg border-1 outline-none border-gray-300 focus:border-azulSena" id={modulo.Id_Mod} type="text" defaultValue={modulo.Tit_Mod} placeholder="Introduce el nombre del modulo" />
                                                    </div>) : <h4 className="font-bold text-lg mx-2">{modulo.Tit_Mod}</h4>}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-100">
                                                    <button onClick={() => handleEditClick(modulo.Id_Mod)} className="bg-transparent text-azulSena md:bg-azulSena md:hover:bg-black md:text-white p-1 rounded-full transition-all duration-150"><Edit size={18} /></button>
                                                    <button value={modulo.Id_Mod} className="bg-transparent text-red-500 md:bg-red-500 md:hover:bg-red-600 md:text-white p-1 rounded-full transition-all duration-150"><Trash2 size={18} /></button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 items-start w-full">
                                                {[...modulo.Contenido_Modulos, ...modulo.evaluacions]
                                                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                                    .map((item) => {
                                                        if (item.Id_Cont && item.ESTADO_REGISTRO == 1) {
                                                            // Es un contenido de módulo
                                                            return (
                                                                <div key={item.Id_Cont} className="flex flex-col group gap-3 items-start border-1 border-gray-300 bg-gray-100 text-black p-2 rounded-lg w-full">
                                                                    <div className="flex items-center justify-between gap-2 w-full">
                                                                        <div className="flex items-center gap-4">
                                                                            <span className="flex items-center gap-2 text-md font-semibold"><Video size={20} />{item.Tit_Cont}</span>
                                                                            <div className="flex flex-wrap items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-100">
                                                                                <button className="bg-transparent text-azulSena md:bg-azulSena md:hover:bg-black md:text-white p-1 rounded-full transition-all duration-150"><Edit size={18} /></button>
                                                                                <button value={item.Id_Cont} onClick={(e) => eliminarClase(e.currentTarget.value)} className="bg-transparent text-red-500 md:bg-red-500 md:hover:bg-red-600 md:text-white p-1 rounded-full transition-all duration-150"><Trash2 size={18} /></button>
                                                                            </div>
                                                                        </div>
                                                                        <button onClick={() => toggleContenidoVisible(item.Id_Cont)}>
                                                                            {contenidoVisible == item.Id_Cont ? <ChevronDown /> : <ChevronLeft />}
                                                                        </button>
                                                                    </div>
                                                                    {item.Url_Cont === null || item.Url_Cont === '' ? (
                                                                        <>
                                                                            <hr className={`w-full border-gray-300 mb-2 ${contenidoVisible == item.Id_Cont ? 'block' : 'hidden'}`} />
                                                                            <div className={`flex items-center justify-end gap-2 w-full ${contenidoVisible == item.Id_Cont ? 'block' : 'hidden'}`}>
                                                                                <UploadButtonWidget
                                                                                    cont={item}
                                                                                    subirVideoContenido={subirVideoContenido}
                                                                                    setContenidoVisible={setContenidoVisible}
                                                                                    label={'Subir video'}
                                                                                />
                                                                                <button className="bg-azulSena p-2 rounded-lg text-white flex items-center gap-1 text-sm hover:bg-black transition-all duration-150"><Link2 size={20} /> Recursos</button>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <div className={`flex items-center justify-between gap-1 w-full ${contenidoVisible == item.Id_Cont ? 'block' : 'hidden'}`}>
                                                                            <Link href={`${item.Url_Cont}`} className="p-2 rounded-lg underline">
                                                                                {item.Tip_Cont == '2' && <span className="flex items-center gap-2"><Video size={20} /> Ver video</span>}
                                                                            </Link>
                                                                            <UploadButtonWidget
                                                                                cont={item}
                                                                                subirVideoContenido={subirVideoContenido}
                                                                                setContenidoVisible={setContenidoVisible}
                                                                                label={'Cambiar video'}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        } else if (item.Id_Eva && item.ESTADO_REGISTRO == 1) {
                                                            // Es una evaluación
                                                            return (
                                                                <div key={item.Id_Eva} className="flex flex-col  gap-3 items-start border-1 border-gray-300 bg-gray-100 text-black p-2 rounded-lg w-full">
                                                                    <div className="flex items-center justify-between gap-2 w-full">
                                                                        <div className="flex items-center gap-4 group">
                                                                            <span className="flex items-center gap-2 text-md font-semibold"><ClipboardCheck size={21} />{item.Tit_Eva}</span>
                                                                            <div className="flex flex-wrap items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-100">
                                                                                <button className="bg-transparent text-azulSena md:bg-azulSena md:hover:bg-black md:text-white p-1 rounded-full transition-all duration-150"><Edit size={18} /></button>
                                                                                <button className="bg-transparent text-red-500 md:bg-red-500 md:hover:bg-red-600 md:text-white p-1 rounded-full transition-all duration-150" value={item.Id_Eva} onClick={(e) => eliminarEvaluacion(e.currentTarget.value)} ><Trash2 size={18} /></button>
                                                                            </div>
                                                                        </div>
                                                                        <button onClick={() => toggleContenidoVisible(item.Id_Eva)}>
                                                                            {contenidoVisible == item.Id_Eva ? <ChevronDown /> : <ChevronLeft />}
                                                                        </button>
                                                                    </div>
                                                                    <div className={`flex items-center justify-between gap-1 w-full ${contenidoVisible == item.Id_Eva ? 'block' : 'hidden'}`}>
                                                                        <ol className="w-full">
                                                                            <h4 className="font-bold text-lg">Preguntas</h4>
                                                                            {item.preguntasevals?.map((preg, index) => (
                                                                                <div key={preg.Id_Preg_Eval}>
                                                                                    <li className="list-decimal font-bold flex items-start justify-start gap-2 w-full">
                                                                                        <span className="font-bold">{index + 1}.</span> {preg.Text_Preg_Eval}
                                                                                    </li>
                                                                                    <ul>
                                                                                        {preg.Respuestas.map(res => (
                                                                                            <div key={res.Id_Res_Eval} className="group/edit block items-center gap-2">
                                                                                                <li className="ml-6 flex items-center gap-8">
                                                                                                    <div className="flex items-center">
                                                                                                        <span className="font-medium text-black flex items-center gap-2">{res.Text_Resp_Eval}{res.Resp_Correcta_Eval == 1 && <div className=" bg-verdeSena text-white rounded-full"><Check size={17} /></div>}</span>
                                                                                                    </div>
                                                                                                    <div className="flex transition-all duration-75 items-center gap-1 md:opacity-0 md:group-hover/edit:opacity-100">
                                                                                                        <button
                                                                                                            value={res.Id_Res_Eval}
                                                                                                            className="bg-transparent text-azulSena md:bg-azulSena md:hover:bg-black md:text-white p-1 rounded-full transition-all duration-150"
                                                                                                        >
                                                                                                            <Edit size={16} />
                                                                                                        </button>
                                                                                                        <button
                                                                                                            value={res.Id_Res_Eval}
                                                                                                            className="bg-transparent text-red-500 md:bg-red-500 md:hover:bg-red-600 md:text-white p-1 rounded-full transition-all duration-150"
                                                                                                        >
                                                                                                            <Trash2 size={16} />
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </li>
                                                                                            </div>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                            {item.preguntasevals.length == 0 && 'No hay preguntas'}
                                                                            {addQuestionForm == item.Id_Eva && (
                                                                                <div className="flex flex-col w-full items-end gap-2 mt-4">
                                                                                    <h4 className="font-bold text-xl w-full">Agregar pregunta</h4>
                                                                                    <div className="flex flex-col items-start gap-1 w-full">
                                                                                        <label className="text-gray-700 font-semibold">Pregunta: </label>
                                                                                        <textarea className="rounded-lg w-full p-2 outline-none border-1 border-gray-300 focus:border-azulSena" type="text" placeholder="Introduce la pregunta" onChange={handleChangeQuestion} />
                                                                                    </div>
                                                                                    <div className='flex flex-col sm:flex-row gap-2 w-full'>
                                                                                        <div>
                                                                                            <label className='font-semibold text-gray-600'>
                                                                                                Opción 1:
                                                                                            </label>
                                                                                            <textarea onChange={handleChangeAnswers} id='0' type='text' className='w-full border-1 border-gray-300 focus:border-azulSena outline-none p-2 rounded-lg' />
                                                                                        </div>
                                                                                        <div>
                                                                                            <label className='font-semibold text-gray-600'>
                                                                                                Opción 2:
                                                                                            </label>
                                                                                            <textarea onChange={handleChangeAnswers} id='1' type='text' className='w-full border-1 border-gray-300 focus:border-azulSena outline-none p-2 rounded-lg' />
                                                                                        </div>
                                                                                        <div>
                                                                                            <label className='font-semibold text-gray-600'>
                                                                                                Opción 3:
                                                                                            </label>
                                                                                            <textarea onChange={handleChangeAnswers} id='2' type='text' className='w-full border-1 border-gray-300 focus:border-azulSena outline-none p-2 rounded-lg' />
                                                                                        </div>
                                                                                        <div>
                                                                                            <label className='font-semibold text-gray-600'>
                                                                                                Opción 4:
                                                                                            </label>
                                                                                            <textarea onChange={handleChangeAnswers} id='3' type='text' className='w-full border-1 border-gray-300 focus:border-azulSena outline-none p-2 rounded-lg' />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='flex flex-col gap-1 w-full'>
                                                                                        <label className='font-semibold text-gray-600'>
                                                                                            Respuesta correcta:
                                                                                        </label>
                                                                                        <select onChange={handleSelectChange} className='p-2 border rounded-lg border-gray-300 focus:border-azulSena outline-none'>
                                                                                            <option value={4}>-Seleccionar opción-</option>
                                                                                            <option value={0}>Opción 1</option>
                                                                                            <option value={1}>Opción 2</option>
                                                                                            <option value={2}>Opción 3</option>
                                                                                            <option value={3}>Opción 4</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2">
                                                                                        <button onClick={() => AddQuestions(question, item.Id_Eva, answers, token)} className="bg-azulSena hover:bg-black transition-all duration-150 text-white flex items-center gap-1 rounded-lg p-2"><Save size={21} /> Guardar</button>
                                                                                        <button className="bg-red-500 hover:bg-red-600 transition-all duration-150 text-white flex items-center gap-1 rounded-lg p-2" onClick={() => setQuestionForm('')}><X size={21} /> Cancelar</button>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            {addQuestionForm !== item.Id_Eva && <button onClick={() => handleShowAddQuestionForm(item.Id_Eva)} className="bg-azulSena mt-4 text-white flex items-center gap-1 rounded-lg p-2"><LucideListPlus /> Agregar pregunta</button>}
                                                                        </ol>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                {createIndexClass === indiceModulo ? (
                                                    <>
                                                        <div className="flex items-center justify-start gap-2 w-full">
                                                            <div className="font-semibold">Nueva clase: </div>
                                                            <input className="rounded-lg w-4/5 p-2 outline-none border-1 border-gray-300 focus:border-azulSena" type="text" placeholder="Introduce el nombre de la clase" onChange={(e) => setCreateNameClass(e.target.value)} />
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <button
                                                                onClick={() => {
                                                                    createClass(modulo.Id_Mod)
                                                                }}
                                                                className="flex items-center gap-1 p-2 rounded-lg border-1 transition-all duration-150 text-white font-medium bg-azulSena hover:bg-black"
                                                            >
                                                                <Save size={20} /> Guardar clase
                                                            </button>
                                                            <button onClick={() => setCreateIndexClass(null)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 rounded-lg p-2 transition-all duration-150 text-white">Cancelar</button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleCreateClick(indiceModulo)}
                                                            className="flex text-sm items-center gap-1 p-2 rounded-lg border-1 transition-all duration-150 text-white font-medium bg-azulSena hover:bg-black"
                                                        >
                                                            <Plus size={20} /> Clase
                                                        </button>
                                                        <button onClick={() => handleClickCrearEvaluacion(modulo.Id_Mod)} className="flex text-sm items-center gap-1 p-2 rounded-lg border-1 transition-all duration-150 text-white font-medium bg-azulSena hover:bg-black">
                                                            <Plus size={20} /> Evaluación
                                                        </button>
                                                    </div>
                                                )}
                                                {crearEvaluacion == modulo.Id_Mod && <CreateQuiz setCrearEvaluacion={setCrearEvaluacion} idMod={modulo.Id_Mod} />}
                                            </div>

                                        </div>
                                    ))}
                                    {mostrarAgregarModulo && (
                                        <div className="border-1 border-azulSena p-3 rounded-lg">
                                            <h4 className="font-bold text-lg my-2 flex items-center gap-1">
                                                <PlusCircle /> Agregar nuevo
                                                módulo
                                            </h4>
                                            <div className="flex flex-col gap-2 items-start">
                                                <input
                                                    type="text"
                                                    placeholder="Nombre del módulo"
                                                    value={nuevoNombreModulo}
                                                    onChange={e => {
                                                        setNuevoNombreModulo(
                                                            e.target.value
                                                        )
                                                    }
                                                    }
                                                    className="border w-full border-gray-300 rounded-lg p-2 outline-none focus:border-azulSena"
                                                />
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={agregarModulo}
                                                        className="p-2 flex items-center gap-1 disabled:cursor-not-allowed rounded-lg bg-azulSena text-white hover:bg-black transition-all duration-150 disabled:opacity-50 font-medium"
                                                        disabled={
                                                            nuevoNombreModulo.trim() ===
                                                            ""
                                                        }
                                                    >
                                                        <CircleFadingPlus />{" "}
                                                        Agregar módulo
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setMostrarAgregarModulo(
                                                                false
                                                            )
                                                        }
                                                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-150 flex items-center gap-1 font-medium"
                                                    >
                                                        <X /> Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex w-full justify-center items-center">
                                    <button
                                        onClick={() =>
                                            setMostrarAgregarModulo(true)
                                        }
                                        className="my-4 transition-all justify-center duration-150 flex items-center gap-2 text-white bg-azulSena hover:bg-black p-2 rounded-lg font-medium"
                                    >
                                        <PlusCircleIcon /> Añadir modulo
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
