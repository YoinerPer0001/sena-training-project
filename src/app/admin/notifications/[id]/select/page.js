'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGetFetch } from "@/hooks/fetchActions/GetFetch";

export default function selectUserPage() {
    const [SelectValue, setSelectValue] = useState(1)
    const [UserData, setUserData] = useState([])
    const [VisibleInputCurso, setVisibleInputCurso] = useState(false)
    const { data, isLoading } = useGetFetch('http://localhost:3000/api/v1/users')

    useEffect(() => {
        if (!isLoading) {
            setUserData(data)
        }
        console.log(data)
    }, [isLoading])


    const { id } = useParams()

    const selectedOption = (event) => {
        setSelectValue(event.target.value)
    }

    useEffect(() => {
        console.log(SelectValue)
    }, [SelectValue])

    const handleClick = (event,value) => {
        console.log(value)
    }


    return (
        <div className=" w-full p-4 lg:w-2/3 rounded-md shadow-md h-full flex flex-col justify-center items-center bg-white">
            <h1 className="block tracking-wide text-gray-700  text-xl font-bold mb-2">Elegir remitente</h1>
            <div className="w-full justify-center p-4 h-full flex">
                <div className="w-40 mx-4">
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
                {SelectValue == 1 && (
                    <Autocomplete
                        
                        onChange={(ev, value)=>handleClick(ev,value.Id_User)}
                        disablePortal
                        id="combo-box-demo"
                        options={!isLoading && UserData}
                        getOptionLabel={(user) => user.Ema_User}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Estudiante" />}
                    />
                )}
            </div>
        </div>
    );
}