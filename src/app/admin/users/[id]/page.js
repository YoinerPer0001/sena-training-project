'use client'
import { useParams } from 'next/navigation'
import UserTable from '@/components/adminComponents/tables/UserTables';
import styles from './userDashboard.module.scss'
export default function userDetailDash() {
    const param = useParams();

    return (
        <div className={`${styles.contPrincipal} flex w-full p-2 bg-slate-100  h-full`}>
            {/* {contenedor izquierdo} */}
            <div className={`${styles.contIzquierdo}  w-2/3 mr-1 flex flex-col`}>
                <div className=' w-full h-1/3 mb-2 mr-1 grid gap-4 lg:grid-flow-col sm:grid-flow-row p-2 '>
                    <div className='w-full bg-white h-60 shadow-sm '>

                    </div>
                    <div className='w-full bg-white h-60 shadow-sm'>

                    </div>
                    <div className='w-full bg-white h-60 shadow-sm'>

                    </div>
                </div>

                <div className=' w-full h-full mr-1 flex p-2 '>
                    <UserTable />
                </div>

            </div>

            {/* {contenedor derecho} */}

            <div className={`${styles.contDerecho} flex-col w-1/3 ml-1 bg-slate-100 flex p-2`}>
                <div className='w-full bg-white mb-2 h-60 shadow-sm'>

                </div>
                <div className={`w-full bg-white h-full shadow-sm`}>

                </div>
            </div>

        </div>
    )
}