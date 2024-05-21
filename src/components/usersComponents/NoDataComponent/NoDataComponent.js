import React from 'react'
import styles from './NoDataComponent.module.scss'
import { Frown } from 'lucide-react'

export const NoDataComponent = () => {
    return (
        <div className={styles.container}>
            <div><Frown /></div>
            <p>¡Ups! No se encontraron resultados</p>
        </div>
    )
  }
