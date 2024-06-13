import Image from 'next/image';
import styles from './MyCoursesCard.module.scss'
import { BookText, Clock, Heart } from 'lucide-react';
// import DarkButtons from '../DarkButtons';

export default function MyCoursesCard({ title, img, category, href, clases, desc, progreso }) {
    return (
        <a href={href}>
            <article className={`${styles.article} shadow-md`}>
                <div className='flex items-center justify-between w-full'>
                    <div className='rounded-full py-1 my-1'>
                        <span className="font-medium text-sm text-center">{category}</span>
                    </div>
                    <div>
                        <span className='text-sm font-medium flex items-center gap-1'><Clock size={16}/>{progreso}% completado</span>
                    </div>
                </div>
                <picture>
                    <Image src={img} alt={title} width="1280" height="720" />
                </picture>
                <div className='my-2'>
                    <h3 className="text-left line-clamp-1 font-bold">{title}</h3>
                    <span className='text-sm font-medium text-gray-700 leading-3 max-h-[40px]'>{desc}</span>
                    <div className='w-full h-[6px] bg-gray-300 rounded-full my-2'>
                        <div className='w-2/4 h-[6px] bg-azulSena rounded-full my-2'></div>
                    </div>
                </div>
                <div className='w-full'>
                    <button className='font-semibold w-full bg-azulSena text-white hover:bg-black transition-all duration-150 rounded-lg p-2'>
                        Continuar curso
                    </button>
                </div>
            </article>
        </a>
    )
}