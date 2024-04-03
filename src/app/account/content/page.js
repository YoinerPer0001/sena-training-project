import SignUpCards from '@/components/SignUpCard/SignUpCards';
import styles from './Content.module.scss'
import ManageCoursesCard from '@/components/ManageCoursesCard/ManageCoursesCard';

export default function Content() {
    return (
        <section className={styles.container}>
            <h3>Cursos</h3>
            <div className={styles.container_button_add}>
                <button>Añadir nuevo curso</button>
            </div>
            <hr />
            <div className={styles.container_cursos}>
              <ManageCoursesCard title={"Desarrollo web con HTML, CSS Y JavaScript con arquitectura  CleanUp" } category={"sistemas"} img={"/image1.jpg"}/>
              <hr />
              <ManageCoursesCard title={"Actividad física con balón retenido" } category={"deportes"} img={"/image1.jpg"}/>
              <hr />
              <ManageCoursesCard title={"Base de datos con MySQL y PostgresSQL" } category={"sistemas"} img={"/image1.jpg"}/>
              <hr />
              <ManageCoursesCard title={"Actividad física con balón retenido" } category={"deportes"} img={"/image1.jpg"}/>
              <hr />
              <ManageCoursesCard title={"Desarrollo web con HTML, CSS Y JavaScript con arquitectura  CleanUp" } category={"sistemas"} img={"/image1.jpg"}/>
            </div>
        </section>
    );
}