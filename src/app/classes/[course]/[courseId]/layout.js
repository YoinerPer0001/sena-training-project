'use client'

import { NavBarClasses } from "@/components/usersComponents/NavBarClasses/NavBarClasses";

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