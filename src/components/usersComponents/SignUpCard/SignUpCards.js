import Image from 'next/image';
import styles from './SignUpCards.module.scss'
import { BookText, Heart } from 'lucide-react';
// import DarkButtons from '../DarkButtons';

export default function SignUpCards({ title, img, category, href, clases }) {
    return (
        <a href={href}>
            <article className={styles.article}>
                <div className={styles.category}>
                    <span className="font-semibold text-xs text-center uppercase">{category}</span>
                </div>
                <picture>
                    <Image src={img} alt={title} width="1280" height="720" />
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
                        <span>{clases} clases</span>
                    </div>
                </div>
            </article>
        </a>
    )
}