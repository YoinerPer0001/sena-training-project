'use client'
import { Work_Sans } from "next/font/google";
import Head from 'next/head';
import styles from './Layout.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { NavHome } from "@/components/Nav/NavHome";
import { Footer } from "@/components/Footer/Footer";
import { MdFace6 } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdMovie } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { usePathname } from "next/navigation";

const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300','400','500','600','700','800'] });

export default function AccountLayout({ children }) {
    const pathname = usePathname()

  return (
    <html lang="en">
      <Head>  
        <title>SENA Learn</title>
        <meta name="description" content="Desarrolla, crea y aprende. Todo aquí, en SENA Learn"></meta>
      </Head>
      <body className={work_sans.className}>
        <main className={styles.main}>
                <aside className={styles.aside}>
                    <Image src={'/logo.webp'} alt='logo' width={50} height={50}/>
                    <ul>
                        <li><Link href="./profile"><MdPerson /> <span>Inicio</span></Link></li>
                    </ul>
                    <ul>
                        <li><Link href="./profile" className={pathname == '/account/profile' ? styles.active : ''}><MdPerson /> <span>Mi perfil</span></Link></li>
                        <li><Link href="./content" className={pathname == '/account/content' ? styles.active : ''}><MdMovie /> <span>Gestionar contenido</span></Link></li>
                        <li><Link href="./users" className={pathname == '/account/users' ? styles.active : ''}><MdFace6 /> <span>Gestionar usuarios</span></Link></li>
                        <li><Link href="./support" className={pathname == '/account/support' ? styles.active : ''}><MdInfo /> <span>Soporte técnico</span></Link></li>
                    </ul>
                </aside>
                {children}
        </main>
      </body>
    </html>
  );
}