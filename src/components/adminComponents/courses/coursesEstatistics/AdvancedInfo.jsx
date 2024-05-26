import { useGetFetch } from "@/hooks/fetchActions/GetFetch"
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Image from 'next/image'
import capitalize from "capitalize"
import { BookOpen } from 'lucide-react'

export const AdvancedInfo = ({ curso }) => {
    const { data, isLoading } = useGetFetch(`http://localhost:3000/api/statistics/course/advanced/${curso}`)

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {!isLoading ? (
                <div className={`w-full grid gap-4 lg:grid-flow-col sm:grid-flow-row justify-center  items-center flex-row  p-4 bg-azulSena border-b-4 border-verdeSena`}>

                    <div className='grid w-full gap-2 lg:md:xl:p-4 mb-2 sm:p-0 lg:grid-cols-2 sm:grid-flow-row justify-center items-start'>
                        <div className=' flex flex-col p-4 min-h-32 w-64 shadow-md  bg-white '>
                            <span className="font-semibold text-md text-azulSena">Tasa de finalizacion</span>
                            <span className=" font-extrabold font-sans text-6xl text-verdeSena">{data.tasaFinalizacion}%</span>
                        </div>
                        <div className='flex flex-col p-4 min-h-32 w-64 shadow-md  bg-white'>
                            <span className="font-semibold text-md text-azulSena">Tasa abandono</span>
                            <span className={`${data.tasaAbandono >= 60 ? 'text-[#FF6C20]' : 'text-verdeSena'} font-extrabold font-sans text-6xl `}>{data.tasaAbandono}%</span>
                        </div>
                        <div className='flex flex-col p-4 min-h-32 w-64 shadow-md  bg-white '>
                            <span className="font-semibold text-md text-azulSena">T. prom. por clases (mins) </span>
                            <span className={` font-extrabold font-sans text-6xl`}>{data.tiempoPromCont}</span>
                        </div>
                        <div className='flex flex-col p-4 min-h-32 w-64 shadow-md  bg-white '>
                            <span className="font-semibold text-md flex text-azulSena"><BookOpen className="mx-2"/>Clases</span>
                            <span className=" font-extrabold font-sans  text-6xl">{data.CantVideos}</span>
                        </div>
                    </div>

                    <div className='text-white min-h-96 p-4 lg:w-96 sm:w-64 shadow-md bg-white  '>
                        <div className="w-full flex-col h-auto flex items-center justify-center">
                            <Image className="rounded-full" src={data.InstInfo.Fot_User} width={100} height={100} alt="Foto de perfil"/>
                            <span className="font-semibold text-md text-[#9b9a9a]">Instructor</span>
                            <span className="font-semibold text-md text-azulSena">{capitalize(data.InstInfo.Nom_User) + " " + capitalize(data.InstInfo.Ape_User)}</span>
                            <span className=" text-md text-[#9b9a9a]">{capitalize(data.InstInfo.Ema_User)}</span>
                            <span className=" font-semibold text-md text-azulSena mt-4">Cursos Creados</span>
                            <Gauge valueMin={0} valueMax={100} width={120} height={120} value={parseInt(data.CantCursosInst)} />

                        </div>
                    </div>

                </div>

            ) : <div>Cargando....</div>}

        </>
    )
}
