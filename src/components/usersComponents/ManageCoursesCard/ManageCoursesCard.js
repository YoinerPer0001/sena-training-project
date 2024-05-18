import Image from 'next/image';
import styles from './ManageCoursesCards.module.scss'
// import DarkButtons from '../DarkButtons';

export default function ManageCoursesCard({title, img, category}) {
    return (
        <article className={styles.article}>
            <div className={styles.left}>
                <picture className={styles.picture}>
                    <Image src={img} alt={title} width="261" height="200"/>
                </picture>
                <div className={styles.title_div}>
                    <div className={styles.title}>
                        <h3>{title}</h3>
                    </div>
                    <div className={styles.details}>
                        <span className={styles.category}>{category}</span>
                        <span><b>Instr. </b>Juan Olivares</span>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <button>Editar curso</button>
            </div>
        </article>
    )
}