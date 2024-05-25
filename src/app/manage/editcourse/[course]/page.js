"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
    AlertCircle,
    ArrowLeftToLine,
    ChevronDown,
    ChevronLeft,
    Edit,
    Eye,
    File,
    ImagePlus,
    Info,
    Link2,
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
import { CldUploadWidget } from "next-cloudinary";
import { useGetFetch } from "@/components/adminComponents/fetchActions/GetFetch";
import { Accordion, AccordionItem, Progress } from "@nextui-org/react";
import useEditCourse from "@/utils/editCourseFunctions/editCourseInputs/editCourseInputs";
import useContentCourseHandlers from "@/hooks/useContentCourseHandlers";


export default function ManageCourses() {
    const pathname = usePathname();
    const router = useRouter();

    const [categories, setCategories] = useState();
    const [dataCourse, setDataCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const id = pathname.split("/");
    const idCourse = id[id.length - 1];
    const token = getCookie("sessionToken");

    const {
        modulos,
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
        subirVideoContenido
    } = useContentCourseHandlers(token, idCourse)

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
                        };
                    });
                    setObjetivos(objCursos);
                    setLoading(false);
                } else {
                    setObjetivos([{ IdObj: uuidv4(), Desc_Objetivo: "" }]);
                    setLoading(false);
                }
            });
    }, []);



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
    const [requisitos, setRequisitos] = useState([]); // Estado inicial con un campo de entrada

    const agregarRequisito = () => {
        setRequisitos([...requisitos, { IdObj: uuidv4(), Desc_Req: "" }]); // Agrega un nuevo campo de entrada vacío al arreglo de requisitos
    };

    const handleChange = (index, value) => {
        const nuevosRequisitos = [...requisitos];
        nuevosRequisitos[index] = { Desc_Req: value };
        setRequisitos(nuevosRequisitos);
    };

    const eliminarRequisito = index => {
        const nuevosRequisitos = [...requisitos];
        nuevosRequisitos.splice(index, 1);
        setRequisitos(nuevosRequisitos);
    };

    const fetchAgregarRequisitos = () => {
        try {
            if (requisitos.length > 1 || requisitos[0].Desc_Objetivo === "") {
                return;
            }
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
                    console.log(data);
                });
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    // AGREGAR OBJETIVOS

    const [objetivos, setObjetivos] = useState([]);

    const agregarObjetivo = () => {
        setObjetivos([...objetivos, { IdObj: uuidv4(), Desc_Objetivo: "" }]);
        console.log(objetivos);
    };

    const handleChangeObj = (index, value) => {
        const nuevosObjetivos = [...objetivos];
        nuevosObjetivos[index].Desc_Objetivo = value;
        setObjetivos(nuevosObjetivos);
    };

    const eliminarObjetivo = idObj => {
        if (objetivos.length > 1 || objetivos.length === 2) {
            const objetivoAEliminar = objetivos.find(
                objetivo => objetivo.IdObj === idObj
            ); // Obtenemos el objetivo a eliminar por su índice
            const nuevosObjetivos = objetivos.filter(
                objetivo => objetivo.IdObj !== objetivoAEliminar.IdObj
            ); // Filtramos los objetivos para excluir el objetivo a eliminar
            setObjetivos(nuevosObjetivos);
        } else {
            toast.error("Debe haber al menos 1 objetivo.");
        }
    };

    const fetchAgregarObjetivos = () => {
        try {
            const objetivosNoVacios = objetivos
                .filter(objetivo => objetivo.Desc_Objetivo.trim() !== "")
                .map(objetivo => objetivo.Desc_Objetivo);

            console.log(objetivosNoVacios);

            // verificar si hay algún objetivo para agregar
            if (objetivosNoVacios.length === 0) {
                console.log("No hay objetivos para agregar.");
                return;
            }
            if (objetivos.length > 1 || objetivos[0].Desc_Objetivo === "") {
                return;
            }
            fetch("http://localhost:3000/api/v1/obj_cursos/create", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    objetivos: objetivosNoVacios,
                    Id_Cur: idCourse,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });
        } catch (e) {
            console.log("Error: " + e);
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
        if(indiceClase == contenidoVisible) {
            setContenidoVisible("");
        } else {
            setContenidoVisible(indiceClase)
        }
    };



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
                                className="my-4 flex flex-col w-3/4 lg:w-2/4 gap-8 mx-auto font-medium"
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
                                        {requisitos.map((requisito, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    value={requisito}
                                                    placeholder="Ej: Tener acceso a internet."
                                                    onChange={e =>
                                                        handleChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-lg w-full p-2 outline-none border-1 border-gray-300 focus:border-azulSena flex-1"
                                                />
                                                {requisitos.length > 0 && (
                                                    <button
                                                        className="bg-red-500 text-white p-2 hover:bg-red-600 transition-all duration-150 rounded-lg"
                                                        onClick={() =>
                                                            eliminarRequisito(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="text-azulSena flex items-center gap-1 font-semibold transition-all duration-150 p-2 rounded-lg hover:bg-gray-300"
                                        onClick={agregarRequisito}
                                    >
                                        <Plus /> Agregar requisito
                                    </button>
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
                                        {objetivos.map((objetivo, index) => (
                                            <div
                                                key={objetivo.IdObj}
                                                className="flex gap-2 w-full"
                                                id={objetivo.IdObj}
                                            >
                                                <input
                                                    type="text"
                                                    defaultValue={
                                                        objetivo.Desc_Objetivo
                                                    }
                                                    placeholder="Ej: Aprender los fundamentos de React."
                                                    onChange={e =>
                                                        handleChangeObj(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-lg p-2 w-full outline-none border-1 border-gray-300 focus:border-azulSena flex-1"
                                                />
                                                {objetivos.length > 1 && (
                                                    <button
                                                        className="bg-red-500 text-white rounded-lg p-2 transition-all duration-150 hover:bg-red-600"
                                                        onClick={() =>
                                                            eliminarObjetivo(
                                                                objetivo.IdObj
                                                            )
                                                        } // Pasar el ID del objetivo a eliminar
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            className="text-azulSena flex items-center gap-1 font-semibold transition-all duration-150 p-2 rounded-lg hover:bg-gray-300"
                                            onClick={agregarObjetivo}
                                        >
                                            <Plus /> Agregar objetivo
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-lg">
                                        Portada del curso
                                    </label>
                                    <div className="flex gap-2 justify-center flex-col items-center">
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
                            className="my-4 flex flex-col w-full sm:w-3/4 lg:w-2/4 gap-8 mx-auto"
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
                                <div className="flex flex-col gap-10">
                                    {modulos.map((modulo, indiceModulo) => (
                                        <div
                                            key={indiceModulo}
                                            className="border-1 border-azulSena p-3 rounded-lg bg-white"
                                        >
                                            <div className="my-2 flex group items-center gap-2 flex-wrap">
                                                <div>
                                                    {editIndexMod === indiceModulo ? (<div className="flex items-center gap-2 mx-2">
                                                        <span className="font-semibold">Modulo: </span>
                                                        <input className="p-2 rounded-lg border-1 outline-none border-gray-300 focus:border-azulSena" id={modulo.Id_Mod} type="text" defaultValue={modulo.Tit_Mod} placeholder="Introduce el nombre del modulo" />
                                                    </div>) : <h4 className="font-bold text-lg mx-2">{modulo.Tit_Mod}</h4>}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-100">
                                                    <button onClick={() => handleEditClick(indiceModulo)} className="bg-azulSena hover:bg-black text-white transition-all duration-150 p-1 rounded-full"><Edit size={18} /></button>
                                                    <button value={modulo.Id_Mod} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-150"><Trash2 size={18} /></button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 items-start w-full">
                                                {modulo.Contenido_Modulos?.sort((a, b) => a.Indice_Cont - b.Indice_Cont).map((cont) => {
                                                    return (
                                                        <>
                                                            <div onClick={() => toggleContenidoVisible(cont.Id_Cont)} className="flex cursor-pointer flex-col group gap-3 items-start border-1 border-gray-300 bg-gray-100 text-black p-2 rounded-lg w-full">
                                                                <div className="flex items-center justify-between gap-2 w-full">
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="flex items-center gap-2 text-md font-semibold"><Video size={20} />{cont.Tit_Cont}</span>
                                                                        <div className="flex flex-wrap items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-100">
                                                                            <button className="bg-azulSena hover:bg-black text-white transition-all duration-150 p-1 rounded-full"><Edit size={18} /></button>
                                                                            <button value={cont.Id_Cont} onClick={(e) => eliminarClase(e.currentTarget.value)} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-150"><Trash2 size={18} /></button>
                                                                        </div>
                                                                    </div>
                                                                    <button>
                                                                        {contenidoVisible == cont.Id_Cont ? <ChevronDown /> : <ChevronLeft />}
                                                                    </button>
                                                                </div>
                                                                {contenidoVisible == cont.Id_Cont &&
                                                                    <>
                                                                        <hr className="w-full border-gray-300" />
                                                                        <div className="flex items-center justify-end gap-2 w-full">
                                                                            <CldUploadWidget onSuccess={(results) => subirVideoContenido(cont.Id_Cont, results.info.secure_url)} uploadPreset="senalearn" options={{multiple: false, sources: ["local", "url", "google_drive" ]}}>
                                                                                {({ open, results }) => {
                                                                                    console.log(results)
                                                                                    return (
                                                                                        <button
                                                                                            class="bg-azulSena text-sm flex items-center gap-1 text-white p-2 rounded-lg hover:bg-black transition-all duration-150"
                                                                                            onClick={() => open()}
                                                                                        >
                                                                                            <Video size={20} />Subir video
                                                                                        </button>
                                                                                    );
                                                                                }}
                                                                            </CldUploadWidget>
                                                                            <button className="bg-azulSena p-2 rounded-lg text-white flex items-center gap-1 text-sm hover:bg-black transition-all duration-150"><Link2 size={20} /> Recursos</button>
                                                                        </div>
                                                                    </>}
                                                            </div>
                                                        </>
                                                    )
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
                                                                    console.log(modulo)
                                                                    createClass(
                                                                        modulo.Id_Mod
                                                                    )
                                                                }
                                                                }
                                                                className="flex items-center gap-1 p-2 rounded-lg border-1 transition-all duration-150 text-white font-medium bg-azulSena hover:bg-black"
                                                            >
                                                                <Save size={20} /> Guardar clase
                                                            </button>
                                                            <button onClick={() => setCreateIndexClass(null)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 rounded-lg p-2 transition-all duration-150 text-white">Cancelar</button>
                                                        </div>
                                                    </>

                                                ) : (<button
                                                    onClick={() =>
                                                        handleCreateClick(
                                                            indiceModulo
                                                        )
                                                    }
                                                    className="flex text-sm items-center gap-1 p-2 rounded-lg border-1 transition-all duration-150 text-white font-medium bg-azulSena hover:bg-black"
                                                >
                                                    <PlusCircleIcon size={20} /> Añadir
                                                    clase
                                                </button>)}

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
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={agregarModulo}
                                                        className="p-2 flex items-center gap-1 disabled:cursor-not-allowed rounded-lg bg-azulSena text-white hover:bg-black transition-all duration-150 disabled:opacity-50 font-medium"
                                                        disabled={
                                                            nuevoNombreModulo.trim() ===
                                                            ""
                                                        }
                                                    >
                                                        <PlusCircleIcon />{" "}
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
                                <button
                                    onClick={() =>
                                        setMostrarAgregarModulo(true)
                                    }
                                    className="my-4 transition-all duration-150 flex items-center gap-2 text-white bg-azulSena hover:bg-black p-2 rounded-lg font-medium"
                                >
                                    <PlusCircleIcon /> Añadir modulo
                                </button>
                            </div>
                            <button onClick={() => console.log(modulos)}>Mostrar modulos</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
