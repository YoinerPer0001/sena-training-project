import Image from 'next/image'
import React from 'react'

export const NavBarClasses = ({Nom_Cur}) => {
  return (
    <nav className='bg-azulSena p-3 text-white flex items-center justify-center gap-6 w-screen relative z-10'>
        <div>
            <Image src={'/logo-senalearn-(white).png'} alt='Logo SENA Learn' width={50} height={50} />
        </div>
        <span>|</span>
        <div>
            {Nom_Cur}
        </div>
    </nav>
  )
}
