
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import styles from '../../../app/admin/dashboard/dashboard.module.scss'
import { useGetFetch } from '../fetchActions/GetFetch';

export default function Indicadores() {
  const { data, isLoading } = useGetFetch('http://localhost:3000/api/statistics/panel');

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={`${styles.contPrinIzq_inf} w-full h-full grid gap-2 mb-2 `}>
          <div className="bg-[#ffffff] h-44 rounded-lg flex flex-col justify-center shadow-sm items-center p-2">
            <span className="font-semibold text-center text-[#21264F]">Número Total de usuarios</span>
            <Stack

              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 1, md: 3 }}
            >
              <Gauge valueMin={0} valueMax={1000} width={100} height={100} value={parseInt(data.total_usuarios)} />
            </Stack>
          </div>
          <div className="bg-[#ffffff] h-44 rounded-lg flex flex-col shadow-sm justify-center items-center p-2">
            <span className="font-semibold text-center text-[#21264F]">Tasa de finalización de cursos %</span>
            <Stack sx={(theme) => ({
              [`& .${gaugeClasses.valueArc}`]: {
                fill: `${data.tasaFinalizacion >= 70 ? '#39a900' :
                    data.tasaFinalizacion >= 40 && data.tasaFinalizacion <= 70 ? '#FF6C20' : 
                    '#FF5555'
                  }`,
              }
            })}
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 1, md: 3 }}>
              <Gauge valueMin={0} valueMax={100} width={100} height={100} value={parseFloat(data.tasaFinalizacion)} />
            </Stack>
          </div>
          <div className="bg-[#ffffff] h-44 rounded-lg flex flex-col shadow-sm justify-center items-center p-2">
            <span className="font-semibold text-center text-[#21264F]">Progreso promedio de los usuarios %</span>
            <Stack sx={(theme) => ({
              [`& .${gaugeClasses.valueArc}`]: {
                fill: `${data.ProgresoPromedio >= 70 ? '#39a900' :
                    data.ProgresoPromedio >= 40 && data.ProgresoPromedio <= 70 ? '#FF6C20' : 
                    '#FF5555'
                  }`,
              }
            })} direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
              <Gauge valueMin={0} valueMax={100} width={100} height={100} value={parseFloat(data.ProgresoPromedio)} />
            </Stack>
          </div>
          <div className="bg-[#ffffff] h-44 rounded-lg shadow-sm flex flex-col justify-center items-center p-2">
            <span className="font-semibold text-center text-[#21264F]">Tasa de abandono de cursos %</span>
            <Stack sx={(theme) => ({
              [`& .${gaugeClasses.valueArc}`]: {
                fill: `${data.tasaAbandono >= 70 ? '#FF5555' :
                    data.tasaAbandono >= 40 && data.tasaAbandono <= 70 ? '#FF6C20' : 
                    '#39a900'
                  }`,
              }
            })} direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
              <Gauge valueMin={0} valueMax={100} width={100} height={100} value={parseFloat(data.tasaAbandono)} />
            </Stack>
          </div>
        </div>
      )}
    </>
  );
}