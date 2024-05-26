'use client'
import { useState, useEffect } from 'react';
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useGetFetch } from '@/hooks/fetchActions/GetFetch';

export default function BasicLineChart({ curso, fechaI, fechaF }) {

  const [Xaxis, setXaxis] = useState([])
  const [Datos, setDatos] = useState([])

  const { data, isLoading } = useGetFetch(`http://localhost:3000/api/statistics/users/course/activity/${curso}/date/${fechaI}/${fechaF}`)
  useEffect(() => {
    if (!isLoading) {
      let arrayXaxis = [];
      let datooList = [];
      data.cantidad.map(cantidad => {
        arrayXaxis.push(parseInt(cantidad[0]));
        datooList.push(parseInt(cantidad[1]));
      });
      setXaxis(arrayXaxis);
      setDatos(datooList);
    }
  }, [isLoading, data]);

  return (
    <>
      {!isLoading && (
        <LineChart
          xAxis={[{ data: Xaxis }]}

          series={[
            {
              label: 'Actividad de usuarios',
              data: Datos,
            },
          ]}
          height={300}
          loading={isLoading}

        />
      )}

    </>
  );
}