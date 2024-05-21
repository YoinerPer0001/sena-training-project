import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import styles from './Footer.module.scss'
import { Facebook, TwitterIcon } from "lucide-react";
import { Instagram } from "lucide-react";


export const Footer = () => {

  return (
      <footer className={styles.footer}>
        <div className={styles.footer_top}>
          <ul className={styles.policies}>
            <li><Link href="#">Política de privacidad</Link></li>
            <li><Link href="#">Política de cookies</Link></li>
            <li><Link href="#">Aviso legal</Link></li>
          </ul>
          <ul>
            <li><Link href="#"><TwitterIcon/></Link></li>
            <li><Link href="#"><Facebook/></Link></li>
            <li><Link href="#"><Instagram/></Link></li>
          </ul>
        </div>
        <div className={styles.footer_bottom}>
          <div>© Copyright SENA Learn 2024</div>
          <Image src={'/logo-senalearn-(white).png'} alt='logo' width={24} height={24}/>
        </div>
      </footer>
  )
}
