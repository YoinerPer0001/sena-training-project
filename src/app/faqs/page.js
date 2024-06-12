import { Footer } from '@/components/usersComponents/Footer/Footer'
import { NavHome } from '@/components/usersComponents/Nav/NavHome'
import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'

export default function page() {
    const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <>
            <NavHome />
            <main className='max-w-[1024px] mx-auto'>
                <header className='my-2'>
                    <h1 className='font-bold text-3xl text-center my-2'>Preguntas frecuentes</h1>
                    <hr className='w-full border-gray-200' />
                </header>
                <div>

                </div>
            </main>
            <Footer />
        </>
    )
}
