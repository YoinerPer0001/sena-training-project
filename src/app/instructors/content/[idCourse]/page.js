'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';
import { getCookie } from 'cookies-next';
import { NoDataComponent } from '@/components/usersComponents/NoDataComponent/NoDataComponent';
import DataTable from 'react-data-table-component';
import { ArrowLeft, BookmarkCheck, BookMinusIcon, CalendarClock, Dot } from 'lucide-react';

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



    const fechaDesdeBD = courseData.Fech_Crea_Cur;
    // Convertir el string a un objeto de fecha
    const fecha = new Date(fechaDesdeBD);
    // Obtener el día
    const dia = fecha.getDate();
    // Crear un array con los nombres de los meses
    const nombresMeses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    // Obtener el nombre del mes
    const nombreMes = nombresMeses[fecha.getMonth()];
    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${dia} de ${nombreMes} de ${fecha.getFullYear()}`;


    return (
        loading ? <Spinner /> : (
            <div className="bg-gray-100 h-full px-4 py-8 rounded-lg overflow-y-auto">
                <div className='flex justify-between items-center w-full md:w-3/4 mx-auto'>
                    <div>
                        <h1 className="text-3xl font-bold">{courseData.Nom_Cur}</h1>
                        <p className="text-gray-600 font-medium flex items-center gap-1"><CalendarClock size={18} /> Creado el {fechaFormateada}</p>
                    </div>
                    <div className='text-center'>
                        <Link href={`/manage/editcourse/${idCourse}`} className='text-center inline-block bg-azulSena text-white p-2 my-2 rounded-lg mx-auto hover:bg-black transition-all duration-150 text-sm'>Editar curso</Link>
                    </div>
                </div>
                <div className='w-full md:w-3/4 mx-auto my-4'>
                    <p className="text-black font-medium">{courseData.Des_Cur}</p>
                </div>
                <div className="mt-8 mx-auto w-full rounded-lg md:w-3/4 bg-white p-4">
                    <div className='flex items-center justify-start gap-2 mb-2'>
                        <h2 className="text-2xl font-bold">Estudiantes Inscritos</h2>
                    </div>
                    <DataTable
                        columns={columnsStudents}
                        data={inscriptions}
                        pagination
                        highlightOnHover
                        noDataComponent={<div className='text-center font-semibold p-4'>No hay alumnos inscritos.</div>}
                    />
                </div>
                <div className="mt-4 w-full md:w-3/4 rounded-lg bg-white p-4 mx-auto">
                    <h2 className="text-xl md:text-2xl font-bold">Contenido</h2>
                    {courseData.Modulocursos.map((modulo, index) => (
                        <div key={modulo.Id_Mod} className="mt-2">
                            <h3 className="text-base md:text-xl font-bold flex items-center mx-auto gap-2">Modulo {index + 1}: {modulo.Tit_Mod}</h3>
                            <ul className='list-disc' style={{ listStylePosition: 'inside' }}>
                                {modulo.Contenido_Modulos.map(contenido => (
                                    <li key={contenido.Id_Cont} className="transition-all duration-150 p-1 text-sm md:text-base rounded-lg overflow-hidden flex items-center gap-2 font-medium"><Dot size={24} color='#b0b0b0' />{contenido.Tit_Cont}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {courseData.Modulocursos?.length === 0 && 'No se han creado módulos'}
                </div>
                <div className="mt-4 w-full md:w-3/4 rounded-lg bg-white p-4 mx-auto">
                    <h2 className="text-xl md:text-2xl font-bold">Requisitos y objetivos del curso</h2>
                </div>
                <div className="mt-8 text-center">
                    <Link href="/instructors/content" className="text--azulSena hover:underline mx-auto p-2 rounded-lg font-medium justify-center gap-2 text-center flex items-center">
                        <ArrowLeft /> Volver a la lista de cursos
                    </Link>
                </div>
            </div>
        )
    );
}
