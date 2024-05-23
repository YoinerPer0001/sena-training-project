'use client'
import { useParams } from 'next/navigation'
export default function userDetailDash() {
    const param = useParams();

    return (
        <div className=' flex w-full p-2 h-full'>
            {/* {contenedor izquierdo} */}
            <div className=' w-2/3 mr-1 bg-slate-100 flex '>

            </div>

            {/* {contenedor derecho} */}

            <div className=' w-1/3 ml-1 bg-slate-100 flex '>

            </div>

        </div>
    )
}