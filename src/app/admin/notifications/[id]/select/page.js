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

export default function selectUserPage() {
    const [SelectValue, setSelectValue] = useState(1)
    const [UserData, setUserData] = useState([])
    const [CurseData, setCurseData] = useState([])
    const [DatosEnviar, setDatosEnviar] = useState({})


    const { data, isLoading } = useGetFetch('http://localhost:3000/api/v1/users')
    const { data: dataCourse, isLoading: courseloading } = useGetFetch('http://localhost:3000/api/v1/courses')
    const { data: AsignResponse, isLoading: AsigIsloading, error, postData } = usePostFetch('http://localhost:3000/api/v1/notifications/user')

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


    const { id } = useParams() // id de notificacion

    const selectedOption = (event) => {
        setSelectValue(event.target.value)
    }

    useEffect(() => {
        console.log(SelectValue)
    }, [SelectValue])

    const handleClick = (value) => {

        if (SelectValue === 1) {
            const datos = {
                Id_User: value,
                Id_Not: id
            }
            setDatosEnviar(datos)
        }
    }

    const AsigNot = ()=>{
        postData(DatosEnviar)
    }

    useEffect(() => {
        if(!AsigIsloading ){
          
            if(AsignResponse.type == 'success'){
                toast.success("Se Envio la notificacion de manera exitosa")
            }else{
                toast.error("No se pudo enviar la notificacion")
            }
           
        }
    }, [AsignResponse])
    


    return (
        <div className=" w-full p-4 lg:w-2/3 rounded-md shadow-md h-full flex flex-col justify-center items-center bg-white">
            <h1 className="block tracking-wide text-gray-700  text-xl font-bold mb-2">Elegir remitente</h1>
            <div className="w-full justify-center p-4 h-full flex-col items-center ">
                <div className="w-full flex flex-row mb-4 justify-center items-center">
                    <div className="mx-4 w-40">
                        <Select
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
                        <Autocomplete

                            onChange={(evt, value) => handleClick(SelectValue == 1 ? value.Id_User : SelectValue == 2 && value.Id_Cur)}
                            disablePortal
                            id="combo-box-demo"
                            options={!isLoading && SelectValue == 2 ? CurseData : UserData}
                            getOptionLabel={SelectValue == 2 ? (curso) => !courseloading && curso.Nom_Cur || '' : (user) => !isLoading && user.Ema_User || ''}
                            sx={{ width: 300 }}
                            renderInput={(paramsxd) => <TextField {...paramsxd} label={SelectValue == 1 ? "Usuario" : SelectValue == 2 && "Curso"} />}
                        />
                    )}
                </div>


                <button
                    onClick={() => AsigNot()}
                    className="bg-verdeSena hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>

            </div>

        </div>
    );
}