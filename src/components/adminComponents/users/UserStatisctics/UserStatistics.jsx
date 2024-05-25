import { useGetFetch } from '@/components/adminComponents/fetchActions/GetFetch';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';
import { AlertTriangle } from 'lucide-react';

export const UserStatistics = ({ id }) => {

    const { data, isLoading } = useGetFetch(`http://localhost:3000/api/statistics/user/${id}`)

    return (
        <>

            {!isLoading ? (
                <div className=' w-full h-auto mb-2 mr-1 grid gap-4 lg:grid-flow-col sm:grid-flow-row p-2 '>
                    <div className='w-full bg-white h-32 shadow-sm rounded-lg '>
                        <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Cursos inscritos
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold text-gray-700">{data.Inscripciones[0].cantidad}</dd>
                        </div>

                    </div>
                    <div className='w-full bg-white h-32 shadow-sm rounded-lg'>
                        <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Cursos completados
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold text-gray-700">{data.cursosCompletados}</dd>
                        </div>

                    </div>
                    <div className='w-full bg-white h-32 shadow-sm rounded-lg'>
                        <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                {data.tiempoProm != 'NaN' ? 'Tiempo promedio en plataforma' : 'Datos insuficientes'} 
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold text-gray-700">
                                {data.tiempoProm != 'NaN' ? data.tiempoProm + "h" : <AlertTriangle className=' font-bold size-12 w-full text-5xl'/>}
                            </dd>
                        </div>

                    </div>
                </div>

            ) : <div><Spinner /></div>}
        </>
    )
}
