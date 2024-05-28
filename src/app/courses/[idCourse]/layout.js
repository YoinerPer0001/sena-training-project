'use client'

import AsideStudent from "@/components/usersComponents/AsideStudent/AsideStudent";
import { NavHome } from "@/components/usersComponents/Nav/NavHome";
import { NavCourses } from "@/components/usersComponents/NavCourses/NavCourses";
import TopMessageHome from "@/components/usersComponents/TopMessageHome/TopMessageHome";
import styles from './LayoutCourses.module.scss'
import { Footer } from "@/components/usersComponents/Footer/Footer";

export default function inscriptionsLayout({ children }) {

    return (
        <>
            <NavCourses />
            <main className={styles.main}>
                <section className={styles.section}>
                    {children}
                </section>
            </main>
            <Footer />
        </>
    );
}