'use client'
import SignUpCards from '@/components/SignUpCard/SignUpCards';
import styles from './Content.module.scss'
import ManageCoursesCard from '@/components/ManageCoursesCard/ManageCoursesCard';
import DataTable, { defaultThemes } from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Spinner/Spinner';
import { NoDataComponent } from '@/components/NoDataComponent/NoDataComponent';
import { columnsContent, dataContent } from '@/utils/exampleData';
import Link from 'next/link'

export default function Content() {
    const [firstData, setFirstData] = useState([])
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        try {
            fetch('http://localhost:3000/api/v1/cursos')
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    const cursos = data.data.map(curso => ({
                        'names': curso.Nom_Cur,
                        'categories': curso.Categoria.Nom_Cat,
                        'instructors': curso.Instructor == null ? 'Sin instructor' : curso.Instructor.Nom_User,
                        'createdAt': curso.Fech_Crea_Cur,
                        'state': curso.Est_Curso == 2 ? 'Publicado' : 'Creado',
                        'actions': <div className={styles.actions_table}>
                                        <Link className={styles.edit_button_table} href={`/account/content/courses/${curso.Id_Cur}`}>Editar</Link>
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
    return (
        <section className={styles.container}>
            <div className={styles.container_button_add}>
                <h3>Cursos</h3>
                <Link href={'/account/content/create'}>Crear nuevo curso</Link>
                <hr />
                <div className={styles.search}>
                    <div>
                        <label>Nombre: </label>
                        <input name='search_filter_courses' type="text" placeholder="Desarrollo de software" onChange={handleChange} />
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
                />
            </div>
        </section>
    );
}