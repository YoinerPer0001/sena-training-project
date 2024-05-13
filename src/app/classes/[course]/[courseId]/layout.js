'use client'

import { NavBarClasses } from "@/components/NavBarClasses/NavBarClasses";

export default function CoursesLayout({ children }) {

    return (
        <>
            <NavBarClasses />
            <main className="w-full flex overflow-x-hidden h-full bg-gray-800">
                {children}
            </main>
        </>
    );
}