'use client'

import AsideStudent from "@/components/AsideStudent/AsideStudent";
import { NavHome } from "@/components/Nav/NavHome";
import { NavCourses } from "@/components/NavCourses/NavCourses";
import TopMessageHome from "@/components/TopMessageHome/TopMessageHome";
import styles from './LayoutCourses.module.scss'

// import { Work_Sans } from "next/font/google";
// import styles from './Layout.module.scss'
// import Link from 'next/link'
// import Image from 'next/image'
// import { MdInfo } from "react-icons/md";
// import { MdMovie } from "react-icons/md";
// import { MdPerson } from "react-icons/md";
// import { usePathname } from "next/navigation";
// import { Home, BarChart2, CircleUser, Users, Clapperboard, CircleHelp } from 'lucide-react';
// import { PiUserListFill } from "react-icons/pi";
// import { PiChartBarFill } from "react-icons/pi";

// const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

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