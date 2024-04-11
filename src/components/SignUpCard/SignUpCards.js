import Image from 'next/image';
import { MdFavorite } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import styles from './SignUpCards.module.scss'
// import DarkButtons from '../DarkButtons';

export default function SignUpCards({ score, title, img, category, href }) {
    return (
        <a href={href}>
            <article className={styles.article}>
                <div className={styles.category}>
                    <span className="font-semibold text-white text-xs text-center uppercase">{category}</span>
                </div>
                <picture>
                    <Image src={img} alt={title} width="261" height="200" />
                </picture>
                <div className={styles.title_div}>
                    <h3 className="">{title}</h3>
                </div>
                <div className={styles.hr}></div>
                <div className={styles.bottom}>
                    <div>
                        <AiFillHeart color="red" fontSize="1.2em" />
                        <span>678</span>
                    </div>
                    <div>
                        <MdAccessTimeFilled />
                        <span>4 horas</span>
                    </div>
                </div>
            </article>
        </a>
    )
}