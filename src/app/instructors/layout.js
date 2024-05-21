'use client'
import { Work_Sans } from "next/font/google";
import styles from './Layout.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation";
import { Home, BarChart2, CircleUser, Users, Clapperboard, CircleHelp } from 'lucide-react';
import AsideInstructors from "@/components/instructorsComponents/AsideInstructors/AsideInstructors";

const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function AccountLayout({ children }) {
  const pathname = usePathname()

  return (
    <main className={styles.main}>
      <AsideInstructors />
      <section className="w-full h-screen max-h-screen p-4 rounded-lg box-border">
        {children}
      </section>
    </main>
  );
}