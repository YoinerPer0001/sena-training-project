'use client'
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import { Compass, BookCheck, GraduationCap } from 'lucide-react';
import styles from './AsideStudent.module.scss'

function AsideStudent() {

    const pathname = usePathname()

    return (
        <div className={styles.aside}>
            <ul>
                <li><a href="/courses/explore" className={`items-center justify-start ${pathname.includes('/courses/explore') ? styles.active : ''}`}><Compass /> <p>Explorar</p></a></li>
                <li><a href="/courses/mycourses" className={`items-center justify-start ${pathname.includes('/courses/mycourses') ? styles.active : ''}`}><BookCheck /> <p>Mis cursos</p></a></li>
                <li><a href="/courses/myprogress" className={`items-center justify-start ${pathname.includes('/courses/myprogress') ? styles.active : ''}`}><GraduationCap /> <p>Mi progreso</p></a></li>
            </ul>

        </div>
    )
}

export default AsideStudent