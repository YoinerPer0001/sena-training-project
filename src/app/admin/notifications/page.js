'use client'
import { usePostFetch } from "@/hooks/fetchActions/postFetch"
import { Target } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/usersComponents/Spinner/Spinner"

export default function CreatePage() {
    const router = useRouter();
    const url = 'http://localhost:3000/api/v1/notifications/create'
    const [Titulo, setTitulo] = useState('')
    const [Mensaje, setMensaje] = useState('')
    const [CamposState, setCamposState] = useState(false)

    const { data, isLoading, Error, postData } = usePostFetch(url);

    if(isLoading){
        <Spinner/>
    }
    
    const crearNot = async () => {

        if (Titulo.trim() === '' || Mensaje.trim() === '') {
            setCamposState(true)
            return
        }else{
            setCamposState(false)
        }
        const datos = {
            Not_Tit: Titulo,
            Not_Mens: Mensaje
        }

        postData(datos)
        

    }

    useEffect(() => {
        if(!isLoading && data.data.insertedId ){
        
            if(data){
                router.push(`/admin/notifications/${data.data.insertedId}/select`)
            }else{
    
            }
        }
    }, [isLoading])
    
    
    const noSend = (event) => {
        event.preventDefault()
    }

    return (
        <div className=" w-full p-4 lg:w-2/3 rounded-md shadow-md h-full flex flex-col justify-center items-center bg-white">
            <h1 className="block tracking-wide text-gray-700  text-xl font-bold mb-2">Crear notificacion</h1>
            <form onSubmit={noSend} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Titulo
                        </label>
                        <input
                            value={Titulo}
                            onChange={(event) => setTitulo(event.target.value)}
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${CamposState && "border-red-500"}  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Ingrese el titulo">

                        </input>
                        {CamposState && <p className="text-red-500 text-xs italic">Este campo es obligatorio</p>}

                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Mensaje
                        </label>
                        <textarea
                            value={Mensaje}
                            onChange={(event) => setMensaje(event.target.value)}
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border h-60 ${CamposState && "border-red-500"}   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Ingrese el mensaje"></textarea>
                             {CamposState && <p className="text-red-500 text-xs italic">Este campo es obligatorio</p>}
                    </div>
                </div>
            </form>
            <button
                onClick={()=>crearNot()}
                className="bg-verdeSena hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Siguiente</button>
        </div>
    )
}