import styles from './courses.module.scss'
import CoursesTable from '@/components/adminComponents/tables/CoursesTable.jsx';
export default function coursesPage() {
  return (
    <div className={`h-full w-full flex`}>
      <div className={`${styles.contCoursesTable} max-h-full- min-w-full flex items-start p-4`}>
        <CoursesTable/>
      </div>
    </div>
  );
}