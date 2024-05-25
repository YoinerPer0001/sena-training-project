'use client'
import { useParams } from 'next/navigation'
import styles from './userDashboard.module.scss'
import InscriptionTable from '@/components/adminComponents/tables/InscriptionsTable';
import UserTable from '@/components/adminComponents/tables/UserTables';
import { UserStatistics } from '@/components/adminComponents/users/UserStatisctics/UserStatistics';
import { InfoPerfil } from '@/components/adminComponents/users/UserStatisctics/InfoPerfil';

export default function userDetailDash() {
    const { id } = useParams();



    return (
        <div className={`${styles.contPrincipal} flex w-full p-2 bg-[#F1F5F6]  h-full`}>
            {/* {contenedor izquierdo} */}
            <div className={`${styles.contIzquierdo}  w-2/3 mr-1 flex flex-col justify-start`}>

                {/* {user statistics} */}
                <UserStatistics id={id} />

                <div className=' w-full h-auto mr-1 flex p-2'>
                    <InscriptionTable id={id} />
                </div>

            </div>

            {/* {contenedor derecho} */}

            <InfoPerfil id={id} />

        </div>
    )
}