import styles from './courses.module.scss'
import CoursesTable from '@/components/adminComponents/tables/CoursesTable.jsx';
export default function coursesPage() {
  return (
    <div className={`h-full w-full flex`}>
      <div className={`${styles.contCoursesTable} max-h-full- min-w-full lg:md:xl:p-0 flex items-start p-1`}>
 
        <CoursesTable/>
      </div>
    </div>
  );
}