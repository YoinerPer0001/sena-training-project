import React from 'react'
import { PiSmileySadBold } from "react-icons/pi";
import styles from './NoDataComponent.module.scss'

export const NoDataComponent = () => {
    return (
        <div className={styles.container}>
            <div><PiSmileySadBold /></div>
            <p>¡Ups! No se encontraron resultados</p>
        </div>
    )
  }
