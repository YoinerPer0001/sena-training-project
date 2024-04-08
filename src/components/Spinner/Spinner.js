import styles from './Spinner.module.scss'

export const Spinner = () => {
  return (
    <div className={styles.container_spinner}>
        <div className={styles.spinner}>
        </div>
        <div className={styles.text_spinner}>Cargando...</div>
    </div>
  )
}
