import Image from 'next/image';
import { MdFavorite } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import styles from './SignUpCards.module.scss'
import { BookText, Heart } from 'lucide-react';
// import DarkButtons from '../DarkButtons';

export default function SignUpCards({ score, title, img, category, href }) {
    return (
        <a href={href}>
            <article className={styles.article}>
                <div className={styles.category}>
                    <span className="font-semibold text-xs text-center uppercase">{category}</span>
                </div>
                <picture>
                    <Image src={img} alt={title} width="300" height="200" />
                </picture>
                <div className={styles.title_div}>
                    <h3 className="text-left p-1 line-clamp-1">{title}</h3>
                </div>
                <div className={styles.hr}></div>
                <div className={styles.bottom}>
                    <div>
                        <Heart size={18} color='red' strokeWidth={2}/>
                        <span>678</span>
                    </div>
                    <div className={styles.chapters}>
                        <BookText size={18}/>
                        <span>44 capítulos</span>
                    </div>
                </div>
            </article>
        </a>
    )
}