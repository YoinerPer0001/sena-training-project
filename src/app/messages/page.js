import { Footer } from '@/components/usersComponents/Footer/Footer'
import { NavHome } from '@/components/usersComponents/Nav/NavHome'
import React from 'react'

const messagesPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavHome />
      <main className='flex-grow flex flex-col items-center justify-center w-full p-4'>
        <section className='min-h-[500px] max-w-[1024px] p-2 w-full flex flex-col items-center border-1 border-azulSena rounded-lg'>
          <h4 className='text-3xl font-bold'>Mensajes</h4>
          <hr className='border-gray-200 w-full my-2'/>
          <p>No tienes mensajes.</p>
        </section>
        <div className='w-full flex justify-center mt-4'>
          <button className='px-4 py-2 bg-azulSena text-white rounded-lg transition-all duration-150 hover:bg-black'>Nuevo mensaje</button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default messagesPage;
