import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen w-screen overflow-hidden flex justify-center items-center gap-2 flex-col'>
      <Image src={"/logo-senalearn.png"} width={50} height={50} alt='Logo SENA Learn naranja'/>
      <h2 className='font-bold text-2xl'>¡Ups!</h2>
      <p>Lo sentimos, no se encontró la página :(</p>
      <Link href="/" className='bg-azulSena p-2 rounded-lg text-white'>Volver al inicio</Link>
    </div>
  )
}