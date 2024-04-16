'use client'
import { Work_Sans } from "next/font/google";
import styles from './Layout.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { MdInfo } from "react-icons/md";
import { MdMovie } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { usePathname } from "next/navigation";
import { Home, BarChart2, CircleUser, Users, Clapperboard, CircleHelp } from 'lucide-react';
import { PiUserListFill } from "react-icons/pi";
import { PiChartBarFill } from "react-icons/pi";

const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function AccountLayout({ children }) {
  const pathname = usePathname()

  return (
        <main className={styles.main}>
          <div className={styles.aside}>
            <header>
              <picture>
                <Image src={'/logo-senalearn-(white).png'} alt='logo' width={50} height={50} />
              </picture>
            </header>
              <ul>
                <li><a href="/"><Home /> <p>Inicio</p></a></li>
                <li><a href="/admin/analytics" className={pathname.includes('/admin/analytics') ? styles.active : ''}><BarChart2 /> <p>Analíticas</p></a></li>
              </ul>
              <ul>
                <li><a href="/admin/profile" className={pathname.includes('/admin/profile') ? styles.active : ''}><CircleUser /> <p>Mi perfil</p></a></li>
                <li><a href="/admin/content" className={pathname.includes('/admin/content')  ? styles.active : ''}><Clapperboard /> <p>Cursos</p></a></li>
                <li><a href="/admin/users" className={pathname.includes('/admin/users') ? styles.active : ''}><Users /> <p>Usuarios</p></a></li>
                <li><a href="/admin/support" className={pathname.includes('/admin/support') ? styles.active : ''}><CircleHelp /> <p>Soporte técnico</p></a></li>
              </ul>
          </div>
          {children}
        </main>
  );
}