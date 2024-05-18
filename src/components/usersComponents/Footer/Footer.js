import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import styles from './Footer.module.scss'
import { MdFacebook } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";


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
            <li><Link href="#"><AiOutlineTwitter/></Link></li>
            <li><Link href="#"><MdFacebook/></Link></li>
            <li><Link href="#"><AiFillInstagram/></Link></li>
          </ul>
        </div>
        <div className={styles.footer_bottom}>
          <div>© Copyright SENA Learn 2024</div>
          <Image src={'/logo-senalearn-(white).png'} alt='logo' width={24} height={24}/>
        </div>
      </footer>
  )
}
