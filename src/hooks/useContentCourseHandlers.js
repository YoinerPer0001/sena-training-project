import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useContentCourseHandlers = (token, idCourse) => {
    const [nuevoNombreModulo, setNuevoNombreModulo] = useState("");
    const [mostrarAgregarModulo, setMostrarAgregarModulo] = useState(false);
    const [editIndexMod, setEditIndexMod] = useState(null);
    const [createIndexClass, setCreateIndexClass] = useState(null);
    const [createNameClass, setCreateNameClass] = useState("");

    const handleEditClick = (index) => {
        if(index == editIndexMod) {
            setEditIndexMod(null);
            return;
        }
        setEditIndexMod(index);
    };
    const handleCreateClick = (index) => {
        setCreateIndexClass(index);
    }

    const [dataCourse2, setDataCourse2] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llama a ambos endpoints
                const [courseResponse, modulesResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/v1/courses/${idCourse}`),
                    fetch(`http://localhost:3000/api/v1/modulo/curso/${idCourse}`, {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })
                ]);

                const courseData = await courseResponse.json();
                const modulesData = await modulesResponse.json();

                // Extrae solo el array evaluacions de courseData
                const evaluations = courseData.data.Modulocursos.flatMap(mod => mod.evaluacions);

                // Añade las evaluaciones a los módulos correspondientes
                const modulesWithEvaluations = modulesData.data.map(modulo => {
                    const moduleEvaluations = evaluations.filter(eva => eva.Id_Mod_Cur_FK === modulo.Id_Mod);
                    return {
                        ...modulo,
                        evaluacions: moduleEvaluations
                    };
                });

                // Combina la información del curso con los módulos completos
                const completeDataCourse = {
                    ...courseData.data,
                    Modulocursos: modulesWithEvaluations
                };

                setDataCourse2(completeDataCourse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token, idCourse]);

    const fetchWrapper = async (url, options) => {
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (e) {
            console.error("Error: " + e);
            return null;
        }
    };

    const agregarModulo = async () => {
        if (!nuevoNombreModulo.trim()) return;
        const response = await fetchWrapper(`http://localhost:3000/api/v1/modulo_curso/create`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Id_Cur: idCourse,
                Tit_Mod: nuevoNombreModulo,
            }),
        });
        if (response && response.type === 'success') {
            const nuevoModulo = {
                Id_Mod: response.data.insertedId,
                Tit_Mod: nuevoNombreModulo,
                Contenido_Modulos: [],
                evaluacions: []
            };
            setDataCourse2(prevState => ({
                ...prevState,
                Modulocursos: [...prevState.Modulocursos, nuevoModulo]
              }));
            setNuevoNombreModulo("");
            setMostrarAgregarModulo(false);
            toast.success('Se creo el modulo');
        } else {
            toast.error('Error al crear el módulo');
        }
    };

    const createClass = async (modulo) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/cont_mod/create', {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Id_Mod_FK: modulo,
                    Tit_Cont: createNameClass,
                }),
            });
    
            const responseData = await response.json();
    
            if (responseData.type === "success") {
                const newClass = {
                    Id_Mod_FK: modulo,
                    Id_Cont: responseData.data.insertedId,
                    Tit_Cont: createNameClass,
                    createdAt: new Date(Date.now()).toISOString(),
                    ESTADO_REGISTRO: 1,
                    Tip_Cont: null,
                    Url_Cont: '',
                };
                console.log(responseData);
                setDataCourse2(prevDataCourse2 => {
                    // Verificar si prevDataCourse2 es null (por si acaso)
                    if (!prevDataCourse2) {
                        return prevDataCourse2; // Retornar el estado actual si es null
                    }
                
                    // Crear una copia superficial de dataCourse2
                    const newDataCourse2 = { ...prevDataCourse2 };
                
                    // Verificar si Modulocursos existe en newDataCourse2
                    if (newDataCourse2.Modulocursos) {
                        // Iterar sobre los módulos y actualizar si es necesario
                        newDataCourse2.Modulocursos = newDataCourse2.Modulocursos.map(mod => {
                            // Aquí asumo que 'modulo' y 'newClass' son variables definidas previamente
                            if (mod.Id_Mod === modulo) {
                                // Actualizar Contenido_Modulos añadiendo newClass
                                return {
                                    ...mod,
                                    Contenido_Modulos: mod.Contenido_Modulos ? [...mod.Contenido_Modulos, newClass] : [newClass]
                                };
                            }
                            return mod; // Devolver el módulo sin cambios si no coincide el Id_Mod
                        });
                    }
                    console.log(newDataCourse2)
                    return newDataCourse2; // Devolver el nuevo estado actualizado
                });
    
                setCreateIndexClass(null);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addQuiz = async (newEvaluation, idMod) => {
        const updateModulocursos = (prevDataCourse2, idMod, newEvaluation) => {
            if (!prevDataCourse2 || !prevDataCourse2.Modulocursos) {
                return prevDataCourse2;
            }
        
            return {
                ...prevDataCourse2,
                Modulocursos: prevDataCourse2.Modulocursos.map(mod => {
                    if (mod.Id_Mod === idMod) {
                        return {
                            ...mod,
                            evaluacions: mod.evaluacions ? [...mod.evaluacions, newEvaluation] : [newEvaluation]
                        };
                    }
                    return mod;
                })
            };
        };
        
        // Llamada a la función para actualizar dataCourse2
        setDataCourse2(prevDataCourse2 => updateModulocursos(prevDataCourse2, idMod, newEvaluation));
    }
    
    const eliminarClase = (clase) => {
        console.log(clase)
        if (window.confirm("¿Estás seguro de que deseas eliminar esta clase?")) {
            fetch(`http://localhost:3000/api/v1/cont_mod/delete/${clase}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(response => console.log(response))
        } else {
            alert('Cancelaste la eliminación')
        }
    };

    const subirVideoContenido = (idCont, url) => {
        fetch(`http://localhost:3000/api/v1/cont_mod/update/${idCont}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Tip_Cont: 2,
                Url_Cont: url
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.type === 'success') {
                toast.success('Se subió el video correctamente.')
                location.reload()
            } else {
                return toast.error('No se pudo subir el video, intenta nuevamente.')
            }
        })
    }

    return {
        dataCourse2,
        setDataCourse2,
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
        addQuiz
    };
};

export default useContentCourseHandlers;
 
