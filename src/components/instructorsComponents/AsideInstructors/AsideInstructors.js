import { BarChart2, CircleHelp, CircleUser, Clapperboard, Home } from 'lucide-react'
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
                <picture>
                    <Image priority={true} src={'/logo-senalearn-(white).png'} alt='logo' width={30} height={30} />
                </picture>
                <span className='font-medium hidden md:block'>SENALEARN</span>
            </header>
            <ul>
                <li><Link href="/"><Home /> <p>Inicio</p></Link></li>
                <li><Link href="/instructors/analytics" className={pathname.includes('/users/analytics') ? styles.active : ''}><BarChart2 /> <p>Analíticas</p></Link></li>
            </ul>
            <ul>
                <li><Link href="/instructors/profile" className={pathname.includes('/profile') ? styles.active : ''}><CircleUser /> <p>Mi perfil</p></Link></li>
                <li><Link href="/instructors/content" className={pathname.includes('/content') ? styles.active : ''}><Clapperboard /> <p>Mis cursos</p></Link></li>
                <li><Link href="/instructors/support" className={pathname.includes('/support') ? styles.active : ''}><CircleHelp /> <p>Soporte técnico</p></Link></li>
            </ul>
        </div>
    )
}

export default AsideInstructors