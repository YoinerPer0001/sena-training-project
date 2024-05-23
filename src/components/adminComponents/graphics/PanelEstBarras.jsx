'use client'
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useGetFetch } from '../fetchActions/GetFetch';
import { Filter } from "lucide-react";
import styles from './graphics.module.scss'
import { useEffect, useState } from 'react';
// import { Select, SelectItem } from "@nextui-org/react";

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: '# de inscripciones',
    },
  ],
  series: [{ dataKey: 'cant', label: 'Inscripciones en el mes', valueFormatter }],
  height: 300,

  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function BarrasGraphic() {
  const yearAct = new Date().getFullYear();
  const [dataset, setDataset] = useState([]);
  const [selectedYear, setSelectedYear] = useState(yearAct);
  const { data, isLoading } = useGetFetch(`http://localhost:3000/api/v1/inscription/date/${selectedYear}`);

  useEffect(() => {
    if (!isLoading && data) {
      const newDataset = data.filter(dato => dato.mes && dato.cant >= 0)
        .map(dato => ({ mes: dato.mes, cant: dato.cant }));
      setDataset(newDataset);
    }
  }, [data, isLoading]);

  const onSelectChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (

    <>
      <div className='flex flex-row w-full justify-center items-center rounded-md'>
        <span className={`text-[#21264F] h-full font-sans mx-1 flex justify-center items-center`}>
          <Filter size={20}/>
        </span>
        <select onChange={onSelectChange} className='border-1 border-gray-300 focus:border-azulSena cursor-pointer text-gray-800 rounded-md py-2 px-4 focus:outline-none  '>
          {!isLoading && data[0].years.map((year) => (
            <option key={year.year} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
        {/* <Select
          labelPlacement={'outside'}
          label="Filtrar por año"
          className='w-40'
          onChange={onSelectChange}
        >
          {!isLoading && data[0].years.map((year) => (
            <SelectItem key={year.year} value={year.year}>
              {year.year}
            </SelectItem>
          ))}
        </Select> */}
      </div>
      <div className='flex flex-col' style={{ width: '100%', height: '100%' }}>
        <BarChart
          colors={["#6fccff"]}
          dataset={dataset}
          xAxis={[
            { scaleType: 'band', dataKey: 'mes' },
          ]}
          {...chartSetting}
        />
      </div>
    </>
  );
}
