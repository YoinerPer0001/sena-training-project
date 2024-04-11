'use client'
import { Work_Sans } from "next/font/google";
import styles from './Layout.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { MdInfo } from "react-icons/md";
import { MdMovie } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { usePathname } from "next/navigation";
import { PiHouseFill } from "react-icons/pi";
import { PiUserListFill } from "react-icons/pi";
import { PiChartBarFill } from "react-icons/pi";

const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function AccountLayout({ children }) {
  const pathname = usePathname()

  return (
        <div className={styles.main}>
          <div className={styles.aside}>
            <header>
              <picture>
                <Image src={'/logo-senalearn-(white).png'} alt='logo' width={50} height={50} />
              </picture>
            </header>
              <ul>
                <li><a href="/"><PiHouseFill /> <p>Inicio</p></a></li>
                <li><a href="/account/analytics"><PiChartBarFill /> <p>Analíticas</p></a></li>
              </ul>
              <ul>
                <li><a href="/account/profile" className={pathname == '/account/profile' ? styles.active : ''}><MdPerson /> <p>Mi perfil</p></a></li>
                <li><a href="/account/content" className={pathname == '/account/content' ? styles.active : ''}><MdMovie /> <p>Cursos</p></a></li>
                <li><a href="/account/users" className={pathname == '/account/users' ? styles.active : ''}><PiUserListFill /> <p>Usuarios</p></a></li>
                <li><a href="/account/support" className={pathname == '/account/support' ? styles.active : ''}><MdInfo /> <p>Soporte técnico</p></a></li>
              </ul>
          </div>
          {children}
        </div>
  );
}