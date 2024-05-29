'use client'
import { NavBarClasses } from "@/components/usersComponents/NavBarClasses/NavBarClasses";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursesLayout({ children }) {

    const { courseId } = useParams()
    const [dataCourse, setDataCourse] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:3000/api/v1/courses/${courseId}`)
            .then(response => response.json())
            .then(response => {
                if (response.type === 'success') {
                    setDataCourse(response.data)
                    setIsLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [courseId])

    return (
        <>
            <NavBarClasses Nom_Cur={dataCourse.Nom_Cur} />
            <main className="w-full flex overflow-x-hidden h-full bg-gray-800">
                {children}
            </main>
        </>
    );
}