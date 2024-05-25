import { useGetFetch } from '@/hooks/fetchActions/GetFetch';
import { AlertTriangle } from 'lucide-react';

export const UserStatistics = ({ id }) => {

    const { data, isLoading } = useGetFetch(`http://localhost:3000/api/statistics/user/${id}`)

    return (
        <>

            {!isLoading ? (
                <div className=' w-full h-auto mb-2 mr-1 grid gap-4 lg:grid-flow-col sm:grid-flow-row p-2 '>
                    
                        <div class='p-4 flex flex-col text-white min-h-32 w-full shadow-md  bg-gradient-to-r from-[#56DFC4] to-[#56DFC4] '>
                            <span className="font-semibold font-sans text-md text-white">Cursos inscritos</span>
                            <span className=" font-extrabold font-sans text-6xl text-white">{data.Inscripciones[0].cantidad}</span>
                        </div>
                        {/* <div class="flex  flex-col  p-6 text-center  shadow-md bg-gradient-to-r from-[#56DFC4] to-[#56DFC4]">
                            <dt class="order-2 mt-2 text-lg leading-6 font-medium ">
                                Cursos inscritos
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold ">{data.Inscripciones[0].cantidad}</dd>
                        </div> */}

                  
                    
                        <div class='p-4 flex flex-col w-full   min-h-32  shadow-md text-white bg-gradient-to-r from-[#FF5774] to-[#FF8398] '>
                            <span className="font-semibold font-sans text-md text-white"> Cursos completados</span>
                            <span className=" font-extrabold font-sans text-6xl text-white">{data.cursosCompletados}</span>
                        </div>
                        {/* <div class="flex  flex-col  p-6 text-center  shadow-md bg-gradient-to-r from-[#FF5774] to-[#FF8398]">
                            <dt class="order-2 mt-2 text-lg leading-6 font-medium ">
                                Cursos completados
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold ">{data.cursosCompletados}</dd>
                        </div> */}

                   
                  

                        <div class='p-4 flex flex-col w-full text-white min-h-32  shadow-md  bg-gradient-to-r from-[#FFB751] to-[#FFCA7D] '>
                            <span className="font-semibold font-sans text-md text-white">Tiempo en plataforma (mins)</span>
                            <span className=" font-extrabold font-sans text-6xl text-white"> {data.tiempoProm != 'NaN' ? data.tiempoProm : <AlertTriangle className=' font-bold size-12 text-5xl' />}</span>
                        </div>
                        {/* <div class="flex flex-col h-full  p-4 text-center shadow-md  bg-gradient-to-r from-[#FFB751] to-[#FFCA7D]">
                            <dt class="order-2 mt-2 text-lg leading-6 font-medium ">
                                Tiempo en plataforma (mins)
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold ">
                                {data.tiempoProm != 'NaN' ? data.tiempoProm : <AlertTriangle className=' font-bold size-12 w-full text-5xl' />}
                            </dd>
                        </div> */}

                </div>

            ) : <div>Loading...</div>}
        </>
    )
}
