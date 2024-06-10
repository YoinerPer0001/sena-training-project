'use client'
import { useParams } from 'next/navigation'
import styles from './CourseDetails.module.scss'
import { Cards } from '@/components/adminComponents/courses/Cards';
import BasicLineChart from '@/components/adminComponents/graphics/Linea';
import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdvancedInfo } from '@/components/adminComponents/courses/coursesEstatistics/AdvancedInfo';
import Link from 'next/link'
import usePutFetch from '@/hooks/fetchActions/PutFetch';
import toast from 'react-hot-toast';
import { useGetFetch } from '@/hooks/fetchActions/GetFetch';


export default function CourseDetailsPage() {
  const now = new Date();
  const pastMonth = new Date(now);
  pastMonth.setMonth(now.getMonth() - 4);
  pastMonth.setDate(now.getDate() - 31)

  const [FechIn, setFechIn] = useState(pastMonth)
  const [FechFin, setFechFin] = useState(new Date())
  const [CourseData, setCourseData] = useState({})
  const { id } = useParams();

  const { data, isLoading } = useGetFetch(`http://localhost:3000/api/v1/courses/${id}`);
  const { respuesta, UpisLoading, error, doPutFetch } = usePutFetch(`http://localhost:3000/api/v1/courses/update/`)

  useEffect(() => {
    if (!isLoading) {
      setCourseData(data)
    }
    
  })



  const publicar = async () => {
    const data = {
      Est_Cur: 2
    }
    await doPutFetch(id, data)

    if (respuesta && UpisLoading === false) {
      toast.success("Publicado Exitosamente")
      location.reload()
    } else {
      toast.error("Error al publicar")
    }
  }

  return (
    <div className={`w-full flex flex-col h-full bg-slate-100 p-3`}>
      {/* {superior cards container} */}
      <Cards id={id} />

      {/* {inferior graphic container} */}
      <div className={`${styles.contInferior} w-full h-full flex mt-2 p-3`}>
        {/* {izquierdo} */}
        <div className={` w-full h-full flex flex-col   lg:px-4 sm:px-0`}>

          {/* {grafico} */}
          <div className={`w-full h-96 p-2 flex lg:flex-row flex-col justify-center items-center  bg-white shadow-md mb-4`}>

            <BasicLineChart curso={id} fechaI={FechIn} fechaF={FechFin} />

            <div className='w-64 flex h-full justify-center  lg:border-l-2  p-4 flex-col items-center'>

              <div className='w-full flex flex-col justify-start  items-center'>
                {!isLoading && CourseData.Est_Cur != 2 &&
                  <button onClick={publicar} class="bg-verdeSena mb-2 hover:bg-black transition-all duration-150 rounded-lg text-white font-bold py-2 px-4">
                    Publicar
                  </button>
                }


                <Link href={`http://localhost:3001/courses/${id}`}>
                  <button class="bg-azulSena hover:bg-black transition-all duration-150 rounded-lg text-white font-bold py-2 px-4">
                    Vista de estudiante
                  </button>
                </Link>
                <Link className='my-3' href={`http://localhost:3001/manage/editcourse/${id}`}>
                  <button class="bg-azulSena hover:bg-black transition-all duration-150 rounded-lg text-white font-bold py-2 px-4">
                    Editar
                  </button>
                </Link>

              </div>

              <div className='h-full flex flex-col justify-center items-center rounded-lg'>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker defaultValue={dayjs(FechIn)} onChange={setFechIn} label="Desde" />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker defaultValue={dayjs(FechFin)} onChange={setFechFin} label="Hasta" />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

            </div>

          </div>
          {/* {info instructor y cards} */}
          <AdvancedInfo curso={id} />

        </div>
        {/* {derecho} */}

      </div>
    </div>
  );
}