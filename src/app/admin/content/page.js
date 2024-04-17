'use client'
import styles from './Content.module.scss'
import DataTable, { defaultThemes } from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Spinner/Spinner';
import { NoDataComponent } from '@/components/NoDataComponent/NoDataComponent';
import { columnsContent, dataContent } from '@/utils/exampleData';
import Link from 'next/link'
import { Filter, FileInput, CirclePlus } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Content() {
    const [firstData, setFirstData] = useState([])
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        try {
            fetch('http://localhost:3000/api/v1/cursos')
                .then(data => data.json())
                .then(data => {
                    const cursos = data.data.map(curso => ({
                        'names': curso.Nom_Cur,
                        'categories': curso.Categoria.Nom_Cat,
                        'instructors': curso.Instructor == null ? 'Sin instructor' : curso.Instructor.Nom_User,
                        'createdAt': curso.Fech_Crea_Cur,
                        'state': curso.Est_Cur == 2 ? <div className='bg-green-100 text-green-700 p-2 rounded-full font-semibold'>Publicado</div> : <div className='bg-gray-100 text-gray-600 p-2 rounded-full font-semibold'>Creado</div>,
                        'actions': <div className={styles.actions_table}>
                            <Link className={styles.edit_button_table} href={`/admin/content/manage/${curso.Id_Cur}`}>Editar</Link>
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

    // const downloadPDF = async () => {
    //     const capture = document.querySelector('.sc-fLseNd')
    //     html2canvas(capture).then((canvas) => {
    //         const imgData = canvas.toDataURL('img/png')
    //         const doc = new jsPDF('p', 'mm', 'a4');
    //         const componentWidth = doc.internal.pageSize.getWidth()
    //         const componentHeight = doc.internal.pageSize.getHeight()
    //         doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    //         doc.save('Cursos.pdf');
    //     });
    // }

    return (
        <section className={styles.container}>
            <div className={styles.container_button_add}>
                <h3>Cursos</h3>
                <hr />
                <div className={styles.search}>
                    <div className={styles.filter}>
                        <Filter />
                        <input name='search_filter_courses' type="text" placeholder="Filtrar por nombre" onChange={handleChange} />
                    </div>
                    <div className={styles.export}>
                        <Link href={'/admin/content/export'}><FileInput />Exportar PDF</Link>
                        <Link href={'/admin/content/create'}><CirclePlus />Crear nuevo curso</Link>
                    </div>
                </div>
            </div>
            <div className={styles.container_cursos}>
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
                    id="my-table"
                />
            </div>
        </section>
    );
}