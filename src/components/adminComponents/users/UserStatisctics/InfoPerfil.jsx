import { useGetFetch } from '@/components/adminComponents/fetchActions/GetFetch';
import { AlertTriangle } from 'lucide-react';
import styles from '@/app/admin/users/[id]/userDashboard.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export const InfoPerfil = ({ id }) => {

    const { data, isLoading } = useGetFetch(`http://localhost:3000/api/statistics/user/${id}`)

    return (
        <>

            {!isLoading ? (
                <div className={`${styles.contDerecho} flex-col w-1/3 ml-1 bg-slate-100 flex p-2`}>
                    <div className='w-full p-4 bg-white flex  h-1/3 shadow-sm'>
                        <div className='flex mx-2 justify-center items-center h-full'>
                            <Image className='rounded-full' width={70} height={70} src={data.user.Fot_User || '/USER-NO-PHOTO.png'} />
                        </div>
                        <div className='flex mx-2 flex-col h-full justify-center items-start '>
                            <span className=' font-semibold'>{data.user.Nom_User + " " + data.user.Ape_User}</span>
                            <span className=' text-sm text-gray-400'>{data.user.Ema_User}</span>
                        </div>
                    </div>
                    <div className={`p-4 w-full flex-wrap gap-4 bg-white h-full mt-1 shadow-sm`}>
                        <dd class="order-1 text-2xl font-extrabold mb-4 border-b-1 text-gray-700">Certificados Generados</dd>
                        <div className='w-full flex justify-start items-start h-full flex-col'>
                            {data.certificados.lista.map(certificado =>
                                <Link href="/"
                                    class="bg-gray-100 mb-2 text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full ">
                                    {certificado.Curso.Nom_Cur}
                                    <div className=''>
                                        <span className=' font-semibold text-gray-400 text-sm'>Fecha Gen:</span>
                                        <span className='text-gray-700 text-sm mx-2'>{certificado.Fec_Crea_Cert}</span>
                                    </div>
                                </Link>
                            )}
                        </div>

                    </div>
                </div>
            ) : ""}
        </>
    )
}
