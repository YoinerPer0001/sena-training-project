import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useContentCourseHandlers = (token, idCourse) => {
    const [modulos, setModulos] = useState([]);
    const [nuevoNombreModulo, setNuevoNombreModulo] = useState("");
    const [mostrarAgregarModulo, setMostrarAgregarModulo] = useState(false);
    const [editIndexMod, setEditIndexMod] = useState(null);
    const [createIndexClass, setCreateIndexClass] = useState(null);
    const [createNameClass, setCreateNameClass] = useState("");

    const handleEditClick = (index) => {
        setEditIndexMod(index);
    };
    const handleCreateClick = (index) => {
        setCreateIndexClass(index);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/modulo_curso/${idCourse}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                const data = await response.json();
                setModulos(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [idCourse, token]);

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
            };
            setModulos([...modulos, nuevoModulo]);
            setNuevoNombreModulo("");
            setMostrarAgregarModulo(false);
            toast.success('Se creo el modulo');
        } else {
            toast.error('Error al crear el módulo');
        }
    };

    const createClass = async (modulo) => {
        const indices = modulos
            .filter(mod => mod.Contenido_Modulos && mod.Contenido_Modulos.length > 0)
            .map(mod => Math.max(...mod.Contenido_Modulos.map(cont => cont.Indice_Cont)));
    
        const nuevoIndice = indices.length > 0 ? Math.max(...indices) + 1 : 1;
        console.log(nuevoIndice);
    
        try {
            const response = await fetch('http://localhost:3000/api/v1/cont_mod/create', {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Tip_Cont: 1,
                    Id_Mod_FK: modulo,
                    Tit_Cont: createNameClass,
                    Duracion: 20,
                    Indice: nuevoIndice
                }),
            });
    
            const responseData = await response.json();
    
            if (responseData.type === "success") {
                const newClass = {
                    Tip_Cont: 1,
                    Id_Mod_FK: modulo,
                    Tit_Cont: createNameClass,
                    Duracion: 20,
                };
    
                setModulos(prevModulos => {
                    return prevModulos.map(mod => {
                        if (mod.Id_Mod === modulo) {
                            return {
                                ...mod,
                                Contenido_Modulos: mod.Contenido_Modulos ? [...mod.Contenido_Modulos, newClass] : [newClass]
                            };
                        }
                        return mod;
                    });
                });
    
                setCreateIndexClass(null);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

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
                return toast.success('Se subió el video correctamente.')
            } else {
                return toast.error('No se pudo subir el video, intenta nuevamente.')
            }
        })
    }

    return {
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
    };
};

export default useContentCourseHandlers;
