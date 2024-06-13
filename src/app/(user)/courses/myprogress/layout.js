'use client'

import AsideStudent from "@/components/usersComponents/AsideStudent/AsideStudent";
import { NavCourses } from "@/components/usersComponents/NavCourses/NavCourses";
import styles from './LayoutCourses.module.scss'

export default function CoursesLayout({ children }) {

    return (
        <div className="flex flex-col min-h-screen">
            <NavCourses />
            <main className={`${styles.main} flex-1`}>
                <AsideStudent />
                <section className={styles.section}>
                    {children}
                </section>
            </main>
        </div>
    );
}