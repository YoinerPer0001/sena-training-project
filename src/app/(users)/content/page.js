'use client'
import styles from './Content.module.scss'
import DataTable, { defaultThemes } from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';
import { NoDataComponent } from '@/components/usersComponents/NoDataComponent/NoDataComponent';
import { columnsContent, dataContent } from '@/utils/exampleData';
import Link from 'next/link'
import { Filter, FileInput, CirclePlus } from 'lucide-react';

export default function Content() {
    const [firstData, setFirstData] = useState([])
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        try {
            fetch('http://localhost:3000/api/v1/courses')
                .then(data => data.json())
                .then(data => {
                    const cursos = data.data.map(curso => ({
                        'names': curso.Nom_Cur,
                        'categories': curso.Categoria.Nom_Cat,
                        'instructors': curso.Instructor == null ? 'Sin instructor' : curso.Instructor.Nom_User,
                        'createdAt': curso.Fech_Crea_Cur,
                        'state': curso.Est_Cur == 2 ? <div className='bg-green-100 text-green-700 p-2 rounded-full font-semibold'>Publicado</div> : <div className='bg-gray-100 text-gray-600 p-2 rounded-full font-semibold'>Creado</div>,
                        'actions': <div className='flex gap-1'>
                            <Link className='bg-azulSena hover:bg-black transition-all duration-150 p-2 text-white rounded-lg' href={`/admin/content/manage/${curso.Id_Cur}`}>Editar</Link>
                        </div>
                    }));
                    setRecords(cursos)
                    setFirstData(cursos)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])


    const handleChange = (e) => {
        const filteredRecords = firstData.filter(record => {
            return record.names.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(filteredRecords)
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };


    return (
        <div className="bg-gray-100 flex flex-col h-full gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
            <div className={styles.container_button_add}>
                <h3 className='font-bold text-3xl text-center my-2'>Gestión de cursos</h3>
                <hr />
                <div className="flex items-center justify-between my-4">
                    <div className='flex items-center gap-2'>
                        <Filter color='rgb(0, 50, 77)'/>
                        <input className='p-2 rounded-lg border outline-none border-gray-200 focus:border-azulSena' name='search_filter_courses' type="text" placeholder="Filtrar por nombre" onChange={handleChange} />
                    </div>
                    <div className='flex gap-2'>
                        <Link href={'/admin/content/export'} className='text-sm font-medium hover:bg-black transition-all duration-150 bg-azulSena p-2 rounded-lg flex items-center gap-1 text-white'><FileInput />Exportar PDF</Link>
                        <Link href={'/admin/content/create'} className='text-sm font-medium hover:bg-black transition-all duration-150 bg-azulSena p-2 rounded-lg flex items-center gap-1 text-white'><CirclePlus />Crear nuevo curso</Link>
                    </div>
                </div>
            </div>
            <div className='rounded-lg'>
                <DataTable
                    columns={columnsContent}
                    data={records}
                    // selectableRows
                    pagination
                    fixedHeader
                    progressPending={loading}
                    progressComponent={<Spinner />}
                    highlightOnHover
                    noDataComponent={<NoDataComponent />}
                    paginationComponentOptions={paginationComponentOptions}
                />
            </div>
        </div>
    );
}