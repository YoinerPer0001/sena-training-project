import { BarChart2, BarChartBig, CircleHelp, CircleUser, Clapperboard, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './AsideInstructors.module.scss'
import { usePathname } from 'next/navigation'

const AsideInstructors = () => {
    const pathname = usePathname()
    return (
        <div className={styles.aside}>
            <header className='flex w-full items-center gap-2 justify-center py-4'>
                <Link href={'/'}>
                    <Image priority={true} src={'/logo-senalearn-(white).png'} alt='logo' width={30} height={30} />
                </Link>
                <Link href={'/'} className='font-medium hidden md:block'>SENALEARN</Link>
            </header>
            <ul>
                <li><Link href="/instructors/content" className={pathname.includes('/content') ? styles.active : ''}><Clapperboard /> <p>Mis cursos</p></Link></li>
                <li><Link href="/instructors/stats" className={pathname.includes('/stats') ? styles.active : ''}><BarChartBig /> <p>Estadísticas</p></Link></li>
                <li><Link href="/instructors/help" className={pathname.includes('/helpf') ? styles.active : ''}><CircleHelp /> <p>Ayuda</p></Link></li>
            </ul>
        </div>
    )
}

export default AsideInstructors