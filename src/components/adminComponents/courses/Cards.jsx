import { useGetFetch } from "@/hooks/fetchActions/GetFetch"

export const Cards = ({ id }) => {
    const { data, isLoading } = useGetFetch(`http://localhost:3000/api/statistics/course/${id}`)
    return (
        <>

            {/* {cards} */}
            {
                !isLoading ? (
                    <div className={`w-full grid lg:gap-4 2xl:gap-0 px-2 my-2  lg:grid-flow-col sm:grid-flow-row justify-around h-auto `}>
                        <div class='p-4 flex flex-col   min-h-32 w-64 shadow-md text-white bg-gradient-to-r from-[#FF5774] to-[#FF8398] '>
                            <span className="font-semibold font-sans text-md text-white">Estudiantes inscritos</span>
                            <span className=" font-extrabold font-sans text-6xl text-white">{data.estudiantes}</span>
                        </div>
                        <div class='p-4 flex my-2 flex-col text-white min-h-32 w-64 shadow-md  bg-gradient-to-r from-[#FFB751] to-[#FFCA7D] '>
                            <span className="font-semibold font-sans text-md text-white">Modulos</span>
                            <span className=" font-extrabold font-sans text-6xl text-white">{data.modulos}</span>
                        </div>
                        <div class='p-4 flex my-2 flex-col text-white min-h-32 w-64 shadow-md  bg-gradient-to-r from-[#56DFC4] to-[#56DFC4] '>
                            <span className="font-semibold font-sans text-md text-white">Evaluaciones</span>
                            <span className=" font-extrabold font-sans text-6xl text-white">{data.evaluaciones}</span>
                        </div>
                        <div class=' p-4 my-2 flex flex-col text-white min-h-32 w-64 shadow-md  bg-gradient-to-r from-[#4b9fffbb] to-[#71b3ffbe] '>
                            <span className="font-semibold font-sans text-md text-white">Duracion</span>
                            <span className=" font-extrabold font-sans text-6xl text-white">{data.horas}h</span>
                        </div>
                    </div>
                ) : ""
            }
        </>



    )
}
