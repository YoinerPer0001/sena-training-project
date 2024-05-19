import React from 'react'
import SignUpCards from '../SignUpCard/SignUpCards'
import Image from 'next/image'
import CardCategories from '../CardCategories/CardCategories'
import styles from '@/styles/HomePage.module.scss'
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { useAllCourses } from '@/hooks/useAllCourses'
import { ChevronLeft, ChevronRight } from 'lucide-react'


const PageVisitors = () => {

    const { data } = useAllCourses()
    const courses = data.slice(0, 6)

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const courseTemplate = (course) => {

        return (
            <SignUpCards href={`/courses/${course.Id_Cur}`} key={course.Id_Cur} title={course.Nom_Cur} img={`/defaultBackground.webp`} category={course.Categoria.Nom_Cat} />
        )
    }

    return (
        <main className={styles.main}>
            <section className={styles.section_header}>
                <div className={styles.header_top}>
                    <div className="flex flex-col justify-end w-2/4 mb-3">
                        <h4 className="text-5xl font-bold">Descrubre</h4>
                        <h4 className="text-5xl font-bold text-[#39a900] relative left-16">Desarrolla</h4>
                        <h4 className="text-5xl font-bold">Domina</h4>
                    </div>
                    <div className="w-3/4 font-medium">
                        <p>Nuestra plataforma ofrece una amplia gama de cursos virtuales diseñados para empoderar a las mentes curiosas y ambiciosas.</p>
                    </div>
                </div>
                <div>
                    <Image src="/header2.svg" alt="" width={900} height={900} />
                </div>
            </section>
            <section className={styles.section_courses}>
                <div className='mb-5'>
                    <h2 className='text-white font-bold text-3xl'>Cursos populares</h2>
                </div>
                <div className='max-w-[1200px]'>
                    <div className=" mx-auto">
                        <Carousel nextIcon={<ChevronRight />} prevIcon={<ChevronLeft />} value={courses} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" autoplayInterval={4500} circular
                             itemTemplate={courseTemplate} pt={{
                                nextButton: 'text-azulSena font-bold bg-azulSecundarioSena p-2 rounded-full mx-2',
                                previousButton: 'text-azulSena font-bold bg-azulSecundarioSena p-2 rounded-full mx-2',
                                item: 'justify-center',
                                itemsContainer: 'rounded-lg min-h-[390px] items-center justify-content-center',
                                content: 'min-h-[350px] justify-center rounded-lg'
                            }} />
                    </div>
                </div>

                {/* {courses.map((course, index) => {
                        console.log(course)
                        return (
                            <SignUpCards key={course.Id_Cur} title={course.Nom_Cur} img={`/port${index}.webp`} category={course.Categoria.Nom_Cat} />
                        )
                    })} */}
            </section>
            <section className={styles.section_categories}>
                <h2>Categorias destacadas</h2>
                <div className={styles.categories_container}>
                    <div className='flex flex-col sm:flex-row gap-2 mb-2'>
                        <CardCategories title={"Sistemas"} img={'/svg-desarrollo.svg'} description={'Aprende a dominar el arte del desarrollo web, desde el diseño visual hasta la implementación del lado del servidor. Este curso exhaustivo te guiará a través de todas las etapas del desarrollo web, cubriendo tanto el frontend como el backend.'} />
                        <CardCategories title={"Gestión"} img={'/svg-gestion.svg'} description={'Domina los principios fundamentales de gestión y liderazgo para alcanzar el éxito en cualquier entorno profesional.'} />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <CardCategories title={"Automotriz"} img={'/svg-automotriz.svg'} description={'Sumérgete en el fascinante mundo de la industria automotriz con este curso. Explora los fundamentos esenciales de la ingeniería, tecnología y negocios que sustentan el sector.'} />
                        <CardCategories title={"Multimedia"} img={'/svg-multimedia.svg'} description={'Descubre el mundo de la multimedia con clases de edición de video, diseño gráfico y más. Aprende las habilidades esenciales para crear contenido multimedia impactante y cautivador.'} />
                        <CardCategories title={"Bases de datos"} img={'/svg-bd.svg'} description={'Bot development frameworks were created as advanced software tools that eliminate a large amount of manual work and accelerate the development process.'} />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default PageVisitors