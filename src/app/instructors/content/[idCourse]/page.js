'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';
import { getCookie } from 'cookies-next';
import { NoDataComponent } from '@/components/usersComponents/NoDataComponent/NoDataComponent';
import DataTable from 'react-data-table-component';
import { BookmarkCheck, BookMinusIcon } from 'lucide-react';

export default function CourseDetails() {
    const router = useRouter();
    const { idCourse } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [inscriptions, setInscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = getCookie('sessionToken')

    useEffect(() => {
        if (idCourse) {
            Promise.all([
                fetch(`http://localhost:3000/api/v1/courses/${idCourse}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => response.json()),
                fetch(`http://localhost:3000/api/v1/inscription/course/${idCourse}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => response.json())
            ])
                .then(([courseResponse, inscriptionResponse]) => {
                    console.log(inscriptionResponse)
                    setCourseData(courseResponse.data);
                    setInscriptions(inscriptionResponse.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                });
        }
    }, [idCourse]);

    if (loading) {
        return <Spinner />;
    }

    if (!courseData) {
        return <NoDataComponent />;
    }

    const columnsStudents = [
        { name: 'Nombre', selector: row => row.Usuario.Nom_User, sortable: true },
        { name: 'Correo', selector: row => row.Usuario.Ema_User, sortable: true },
        // Agrega más columnas según la estructura de los datos de los estudiantes
    ];

    return (
        loading ? <Spinner /> : (
            <div className="bg-gray-100 h-full p-4 rounded-lg overflow-y-auto">
                <h1 className="text-3xl font-bold text-center text-azulSena">{courseData.Nom_Cur}</h1>
                <p className="text-gray-600 font-medium text-center">{courseData.Des_Cur}</p>
                <p className="text-gray-600 font-medium text-center">Fecha de creación: {new Date(courseData.Fech_Crea_Cur).toLocaleDateString()}</p>
                <div className='text-center'>
                    <Link href={`/manage/editcourse/${idCourse}`} className='text-center inline-block bg-azulSena text-white px-2 py-1 my-2 rounded-lg mx-auto hover:bg-black transition-all duration-150'>Editar curso</Link>
                </div>
                <div className="mt-8 mx-auto w-full rounded-lg md:w-3/4">
                    <h2 className="text-xl font-bold text-center mb-4">Estudiantes Inscritos</h2>
                    <DataTable
                        columns={columnsStudents}
                        data={inscriptions}
                        pagination
                        highlightOnHover
                        noDataComponent={<div className='text-center font-semibold p-4'>No hay alumnos inscritos.</div>}
                    />
                </div>
                <div className="mt-4 w-full mx-auto md:w-3/4 rounded-lg bg-white p-4">
                    <h2 className="text-xl md:text-2xl font-bold text-center">Contenido</h2>
                    {courseData.Modulocursos.map(modulo => (
                        <div key={modulo.Id_Mod} className="mt-2">
                            <h3 className="text-base md:text-xl font-bold flex items-center mx-auto gap-2">{modulo.Tit_Mod}</h3>
                            <ul className='mx-auto '>
                                {modulo.Contenido_Modulos.map(contenido => (
                                    <li key={contenido.Id_Cont} className="odd:bg-gray-100 hover:bg-gray-200 transition-all duration-150 p-1 text-sm md:text-base rounded-lg even:bg-transparent text-gray-600 text-nowrap overflow-hidden text-ellipsis flex items-center gap-2 font-medium"><BookMinusIcon size={18}/>{contenido.Tit_Cont}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {courseData.Modulocursos?.length == 0 && 'No se han creado modulos'}
                </div>
                <div className="mt-8 text-center">
                    <Link href="/instructors/content" className="text-white bg-azulSena mx-auto p-2 rounded-lg font-medium inline text-center">
                        Volver a la lista de cursos
                    </Link>
                </div>
            </div>
        )
    );
}
