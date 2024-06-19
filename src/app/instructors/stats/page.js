'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";
import { getCookie } from "cookies-next";
import Image from "next/image";

export default function InstructorStatistics() {
    const [courses, setCourses] = useState([]);
    const [enrollmentsCount, setEnrollmentsCount] = useState(0);
    const [averageProgress, setAverageProgress] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [popularCourses, setPopularCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const instructorId = user ? user.Id_User : null;
    const token = getCookie('sessionToken');

    useEffect(() => {
        async function fetchCoursesAndStatistics() {
            try {
                if (!instructorId) {
                    throw new Error("Instructor ID is missing");
                }

                console.log('Fetching courses for instructor:', instructorId);

                // Fetch courses by instructor
                const coursesResponse = await fetch(`http://localhost:3000/api/v1/courses/inst/${instructorId}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                if (!coursesResponse.ok) {
                    throw new Error(`Error fetching courses: ${coursesResponse.statusText}`);
                }

                const { data: coursesData } = await coursesResponse.json();
                console.log('Courses data:', coursesData);
                setCourses(coursesData);

                // Initialize statistics counters
                let totalEnrollments = 0;
                let totalProgress = 0;
                let totalClassesCount = 0;
                let enrollmentsByCourse = [];

                // Fetch enrollments and progress for each course
                for (const course of coursesData) {
                    const enrollmentsResponse = await fetch(`http://localhost:3000/api/v1/inscription/course/${course.Id_Cur}`, {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    });

                    if (!enrollmentsResponse.ok) {
                        throw new Error(`Error fetching enrollments for course ${course.Id_Cur}: ${enrollmentsResponse.statusText}`);
                    }

                    const { data: enrollmentsData } = await enrollmentsResponse.json();
                    console.log(`Enrollments data for course ${course.Id_Cur}:`, enrollmentsData);
                    const enrollmentsCountForCourse = enrollmentsData.length;
                    totalEnrollments += enrollmentsCountForCourse;
                    enrollmentsByCourse.push({ course, enrollmentsCount: enrollmentsCountForCourse });

                    // Calculate total progress
                    totalProgress += enrollmentsData.reduce((acc, enrollment) => acc + parseFloat(enrollment.Prog_Cur), 0);

                    // Fetch module data for each course to count classes
                    const modulesResponse = await fetch(`http://localhost:3000/api/v1/modulo_curso/${course.Id_Cur}`, {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    });

                    if (!modulesResponse.ok) {
                        throw new Error(`Error fetching modules for course ${course.Id_Cur}: ${modulesResponse.statusText}`);
                    }

                    const { data: modulesData } = await modulesResponse.json();
                    console.log(`Modules data for course ${course.Id_Cur}:`, modulesData);

                    // Count total classes
                    totalClassesCount += modulesData.reduce((acc, module) => acc + module.Contenido_Modulos.length, 0);
                }

                // Set state with the calculated statistics
                setEnrollmentsCount(totalEnrollments);
                setAverageProgress(totalEnrollments > 0 ? totalProgress / totalEnrollments : 0);
                setTotalClasses(totalClassesCount);

                // Sort courses by the number of enrollments in descending order and get the top 3
                enrollmentsByCourse.sort((a, b) => b.enrollmentsCount - a.enrollmentsCount);
                setPopularCourses(enrollmentsByCourse.slice(0, 3));
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        }

        if (instructorId && token) {
            fetchCoursesAndStatistics();
        }
    }, [instructorId, token]);

    if (loading) {
        return <div className="h-screen w-screen flex justify-center items-center"><Spinner /></div>;
    }

    return (
        <main className="flex flex-col lg:flex-grow max-w-[1024px] my-0 mx-auto">
            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center my-6">
                    <h1 className="font-bold text-2xl lg:text-3xl">Estadísticas del Instructor</h1>
                    <div className="flex flex-wrap items-center justify-between w-full gap-2">
                        <div className="bg-white text-sm sm:text-base font-medium border flex-col p-2 rounded-lg flex items-start gap-2 justify-center text-white ">
                            <p className="text-gray-600 text-sm">Cantidad total de inscripciones:</p>
                            <p className="text-3xl font-bold text-black">{enrollmentsCount}</p>
                        </div>
                        <div className="bg-white text-sm sm:text-base font-medium border flex-col p-2 rounded-lg flex items-start gap-2 justify-center text-white ">
                            <p className="text-gray-600 text-sm">Progreso promedio de los estudiantes:</p>
                            <p className="text-3xl font-bold text-black">{averageProgress.toFixed(2)}%</p>
                        </div>
                        <div className="bg-white text-sm rounded-lg p-2 sm:text-base font-medium border flex-col items-start min-w-[200px] text-white flex gap-2 justify-center">
                            <p className="text-gray-600 text-sm">Total de clases:</p>
                            <p className="text-3xl font-bold text-black">{totalClasses}</p>
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <div className="mb-4">
                            <h3 className="text-center text-2xl font-bold">Cursos más populares</h3>
                        </div>
                        <div>
                            {popularCourses.map(({ course, enrollmentsCount }) => (
                                <div key={course.Id_Cur} className="p-4 bg-white border rounded-lg mb-4 flex items-center gap-2 justify-between flex-wrap">

                                    <div className="flex items-center justify-left gap-2">
                                        <Image className="rounded-lg" width={100} height={100} alt="Foto de portada del curso" src={course.Fot_Cur !== null ? course.Fot_Cur : '/defaultBackground.webp'} />
                                        <div>
                                            <h4 className="font-bold text-xl">{course.Nom_Cur}</h4>
                                            <p>{course.Des_Cur}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-lg font-semibold">Inscripciones: {enrollmentsCount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
