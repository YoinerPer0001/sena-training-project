import Image from 'next/image';
import React from 'react';

const ForbiddenPage = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center flex-col'>
            <Image width={50} height={50} src={"/logo-senalearn.png"} alt='Logo SENA Learn' className='mb-4'/>
            <h1 className='font-semibold text-xl'>403 Forbidden</h1>
            <p>Lo siento, no tienes permisos para acceder a esta pagina.</p>
        </div>
    );
};

export default ForbiddenPage;