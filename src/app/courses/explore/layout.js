'use client'

import AsideStudent from "@/components/usersComponents/AsideStudent/AsideStudent";
import { NavCourses } from "@/components/usersComponents/NavCourses/NavCourses";
import styles from './LayoutCourses.module.scss'

export default function CoursesLayout({ children }) {

    return (
        <>
            <NavCourses />
            <main className={styles.main}>
                <AsideStudent />
                <section className={styles.section}>
                    {children}
                </section>
            </main>
        </>
    );
}