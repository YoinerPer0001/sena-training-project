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
import { PiHouseFill } from "react-icons/pi";
import { PiUserListFill } from "react-icons/pi";
import { PiChartBarFill } from "react-icons/pi";

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
        <div className={styles.main}>
                <div className={styles.aside}>
                    <picture>
                      <Image src={'/logo-senalearn-(white).png'} alt='logo' width={50} height={50}/>
                    </picture>
                    <ul>
                        <li><Link href="/"><PiHouseFill /> <p>Inicio</p></Link></li>
                        <li><Link href="/"><PiChartBarFill /> <p>Analíticas</p></Link></li>
                    </ul>
                    <ul>
                        <li><Link href="/account/profile" className={pathname == '/account/profile' ? styles.active : ''}><MdPerson /> <p>Mi perfil</p></Link></li>
                        <li><Link href="/account/content" className={pathname == '/account/content' || pathname.includes('/account/content') ? styles.active : ''}><MdMovie /> <p>Cursos</p></Link></li>
                        <li><Link href="/account/users" className={pathname == '/account/users' ? styles.active : ''}><PiUserListFill /> <p>Usuarios</p></Link></li>
                        <li><Link href="/account/support" className={pathname == '/account/support' ? styles.active : ''}><MdInfo /> <p>Soporte técnico</p></Link></li>
                    </ul>
                </div>
                {children}
        </div>
      </body>
    </html>
  );
}