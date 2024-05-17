'use client'
import { Work_Sans } from "next/font/google";
import styles from './Layout.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation";
import { Home, BarChart2, CircleUser, Users, Clapperboard, CircleHelp } from 'lucide-react';

const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function AccountLayout({ children }) {
  const pathname = usePathname()

  return (
    <main className={styles.main}>
      <div className={styles.aside}>
        <header>
          <picture>
            <Image priority={true} src={'/logo-senalearn-(white).png'} alt='logo' width={50} height={50} />
          </picture>
        </header>
        <ul>
          <li><Link href="/"><Home /> <p>Inicio</p></Link></li>
          <li><Link href="/admin/analytics" className={pathname.includes('/admin/analytics') ? styles.active : ''}><BarChart2 /> <p>Analíticas</p></Link></li>
        </ul>
        <ul>
          <li><Link href="/admin/profile" className={pathname.includes('/admin/profile') ? styles.active : ''}><CircleUser /> <p>Mi perfil</p></Link></li>
          <li><Link href="/admin/content" className={pathname.includes('/admin/content') ? styles.active : ''}><Clapperboard /> <p>Cursos</p></Link></li>
          <li><Link href="/admin/users" className={pathname.includes('/admin/users') ? styles.active : ''}><Users /> <p>Usuarios</p></Link></li>
          <li><Link href="/admin/support" className={pathname.includes('/admin/support') ? styles.active : ''}><CircleHelp /> <p>Soporte técnico</p></Link></li>
        </ul>
      </div>
      <section className="w-full h-screen max-h-screen p-4 rounded-lg box-border">
        {children}
      </section>
    </main>
  );
}