
import UserTable from "@/components/adminComponents/tables/UserTables";
import styles from "./user.module.scss"
export default function usersPage() {
  return (
    <div className={`h-full w-full flex`}>
      <div className={`${styles.contUsersTable} max-h-full- min-w-full lg:md:xl:p-0 flex items-start p-1`}>
        <UserTable />
      </div>

    </div>
  );
}