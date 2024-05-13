'use client'

import AsideStudent from "@/components/AsideStudent/AsideStudent";
import { NavHome } from "@/components/Nav/NavHome";
import { NavCourses } from "@/components/NavCourses/NavCourses";
import TopMessageHome from "@/components/TopMessageHome/TopMessageHome";
import styles from './LayoutCourses.module.scss'
import { Footer } from "@/components/Footer/Footer";

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