'use client'
import styles from './Layout.module.scss'
import AsideInstructors from "@/components/instructorsComponents/AsideInstructors/AsideInstructors";
export default function AccountLayout({ children }) {

  return (
    <main className={styles.main}>
      <AsideInstructors />
      <section className="w-full h-screen max-h-screen p-4 rounded-lg box-border overflow-y-hidden">
        {children}
      </section>
    </main>
  );
}