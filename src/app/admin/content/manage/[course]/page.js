'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function ManageCourses() {
    const pathname = usePathname()
    return (
        <div>ManageCourses {pathname}</div>
    )
}
