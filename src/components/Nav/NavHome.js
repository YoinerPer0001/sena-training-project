import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './NavHome.module.scss'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../../features/auth/loginSlice'


export const NavHome = () => {
  const authState = useSelector(state => state.auth)
  console.log(authState)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(false))
  }

  return (
    <header className={styles.header}>
      <div className={styles.message_header}>
        <p>Desarrolla tus Talentos a Gran Escala | Descubre por qué miles confían en nosotros en todo el mundo</p>
      </div>
      <nav className={styles.nav}>
        <div>
          <Image alt="Logo SENA Learn" src="/logo.webp" width={50} height={50} />
        </div>
        <div>
          <ul className={styles.ul}>
            <li className={styles.li}><Link href="/">Explorar</Link></li>
            <li className={styles.li}><Link href="/about">Cursos</Link></li>
            <li className={styles.li}><Link href="/contact">Categorias</Link></li>
          </ul>
        </div>
        <div className={styles.login_nav}>
          {authState.isAuthenticated ? <Link href="account/profile">Mi cuenta</Link> : <div><Link href="auth/login">Iniciar sesión</Link><button>Cerrar sesión</button></div>}
        </div>
      </nav>
    </header>
  )
}
