'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGetFetch } from "@/hooks/fetchActions/GetFetch";
import { usePostFetch } from "@/hooks/fetchActions/postFetch";
import toast from "react-hot-toast";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { StepBack } from "lucide-react";
import { useDeleteFetch } from "@/hooks/fetchActions/DeleteFetch";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";

export default function selectUserPage() {
    const [SelectValue, setSelectValue] = useState(1)
    const [UserData, setUserData] = useState([])
    const [CurseData, setCurseData] = useState([])
    const [DatosEnviar, setDatosEnviar] = useState({})
    const [DatosMostrar, setDatosMostrar] = useState({})//se guardan los datos a mostrar cuando se selecciona un usuario
    const [VisibleData, setVisibleData] = useState(false)
    const [CamposState, setCamposState] = useState(false)

    const { id } = useParams() // id de notificacion
    const router = useRouter();
    const pathname = usePathname();

    const { data, isLoading } = useGetFetch('http://localhost:3000/api/v1/users')
    const { data: dataCourse, isLoading: courseloading } = useGetFetch('http://localhost:3000/api/v1/courses')
    const { data: AsignResponse, isLoading: AsigIsloading, error, postData } = usePostFetch(`http://localhost:3000/api/v1/notifications/${SelectValue == 1 ? 'user' : SelectValue == 2 && 'course'}`)
    const { data: DelResponse, isLoading: DelIsloading, error: DelError, deleteData } = useDeleteFetch(`http://localhost:3000/api/v1/notifications/delete/`);

    useEffect(() => {
        if (!isLoading) {
            setUserData(data)
        }

    }, [isLoading])

    useEffect(() => {
        if (!courseloading) {
            setCurseData(dataCourse)
        }

    }, [courseloading])

    useEffect(() => {
        if (!DelIsloading) {
            if (DelResponse.type == 'success') {
                router.push('/admin/notifications')
            }
        }
    }, [DelIsloading])

    useEffect(() => {
        if (SelectValue === 3) {
            setVisibleData(false)
        }
    }, [SelectValue])


    useEffect(() => {
        if (!AsigIsloading) {

            if (AsignResponse.type == 'success') {
                router.push(pathname + '/send')
            } else {
                toast.error("Error al enviar la notificacion")
            }

        } else {
            <Spinner />
        }
    }, [AsignResponse])


    const selectedOption = (event) => {
        setSelectValue(event.target.value)
    }


    const handleClick = (value) => {


        if (SelectValue === 1 || SelectValue === 2) {
            setDatosMostrar(value)
            setVisibleData(true)
            if (SelectValue == 1) {
                const datos = {
                    Id_User: value.Id_User,
                    Id_Not: id
                }

                setDatosEnviar(datos)
            } else {
                const datos = {
                    Id_Not: id,
                    Id_Cur: value.Id_Cur
                }
                setDatosEnviar(datos)
            }
        }


    }

    const AsigNot = () => {

        if (Object.keys(DatosEnviar).length < 1) {
            setCamposState(true)
        } else {
            console.log(DatosEnviar)
            setCamposState(false)
            postData(DatosEnviar)
        }

    }

    const deleteNot = () => {
        deleteData(id)
    }

    return (
        <div className=" w-full p-4 lg:w-2/3 rounded-md shadow-md h-full flex flex-col justify-center items-center bg-white">
            <h1 className="block tracking-wide text-gray-700  text-xl font-bold mb-2">Elegir destinatario</h1>
            <div className="w-full justify-center p-4 h-full flex-col items-center ">
                <div className="w-full flex lg:flex-row flex-col mb-4 justify-center items-center">
                    <div className="mx-4 lg:w-40 w-full flex justify-center">
                        <Select
                            className="lg:w-40 w-64"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={SelectValue}
                            label="Age"
                            onChange={selectedOption}
                        >
                            <MenuItem value={1}>Individual</MenuItem>
                            <MenuItem value={2}>Por Curso</MenuItem>
                            <MenuItem value={3}>Enviar a todos</MenuItem>
                        </Select>
                    </div>
                    {SelectValue != 3 && (
                        <div className="px-4 my-2">
                            <Autocomplete
                                onChange={(evt, value) => handleClick(SelectValue == 1 ? value : SelectValue == 2 && value)}
                                disablePortal
                                id="combo-box-demo"
                                noOptionsText="No hay registros"
                                options={!isLoading && SelectValue == 2 ? CurseData : UserData}
                                getOptionLabel={SelectValue == 2 ? (curso) => !courseloading && curso.Nom_Cur || '' : (user) => !isLoading && user.Ema_User || ''}
                                sx={{ width: 256 }}
                                renderInput={(paramsxd) => <TextField {...paramsxd} label={SelectValue == 1 ? "Usuario" : SelectValue == 2 && "Curso"} />}
                            />
                            {CamposState && <p className="text-red-500 text-xs italic">Este campo es obligatorio</p>}
                        </div>




                    )}

                </div>
                {/* {info user} */}

                <div className={`${!VisibleData ? 'opacity-0 invisible' : 'opacity-100 visible'}  transition-opacity duration-500 ease-out w-full border-[#dfdeded0] flex lg:flex-row flex-col border-1 bg-azulSena lg:h-60 h-auto mb-3 rounded-md`}>
                    <div className=" lg:w-1/3 w-full h-full lg:p-0 py-2 flex justify-center items-center">
                        <Image
                            className="rounded-md"
                            priority={true}
                            src={SelectValue == 1 ? DatosMostrar.Fot_User || '/USER-NO-PHOTO.png' : SelectValue == 2 && DatosMostrar.Fot_Cur || '/Cursos-defecto.JPG'}
                            alt="userPhoto" width={150} height={150} />
                    </div>
                    <div className="lg:w-2/3 w-full h-full flex flex-col  p-4">
                        <div className="w-full h-16 border-b-2 border-verdeSena  shadow-md">
                            <span className="block tracking-wide text-white  text-xl font-bold mb-2">{SelectValue == 1 ? DatosMostrar.Nom_User + " " + DatosMostrar.Ape_User : SelectValue == 2 && DatosMostrar.Nom_Cur}</span>
                            <span className="block tracking-wide text-[#dbdada] text-sm mb-2">{SelectValue == 1 && DatosMostrar.rol && DatosMostrar.rol.Nom_Rol}</span>
                        </div>
                        <div className="w-full h-full py-4">
                            <span className="block tracking-wide text-white   text-sm font-bold mb-2">{SelectValue == 1 ? "Email" : SelectValue == 2 && 'Horas de contenido'}</span>
                            <span className="block tracking-wide text-[#dbdada]  text-sm mb-2">{SelectValue == 1 ? DatosMostrar.Ema_User : SelectValue == 2 && DatosMostrar ? DatosMostrar.Hor_Cont_Total : ""}</span>
                            <span className="block tracking-wide text-white  text-sm font-bold mb-2">{SelectValue == 1 ? "Telefono" : SelectValue == 2 && 'Fecha de creacion'}</span>
                            <span className="block tracking-wide text-[#dbdada]  text-sm mb-2">{SelectValue == 1 ? DatosMostrar.Tel_User : SelectValue == 2 && DatosMostrar.Fech_Crea_Cur}</span>
                        </div>

                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <button
                        onClick={() => deleteNot()}
                        className="bg-azulSena hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline">
                        <StepBack />
                    </button>
                    <button
                        onClick={() => AsigNot()}
                        className="bg-verdeSena hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline">
                        Enviar
                    </button>
                </div>

            </div>

        </div>
    );
}