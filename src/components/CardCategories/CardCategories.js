import React from 'react'
import Image from 'next/image'

export default function CardCategories({img, title, description}) {
    return (
        <article className='w-full text-[#0f0f0f] border-2 transition-all cursor-pointer duration-200 rounded-lg border-gray-600 hover:border-azulSena hover:translate-y-[-5px]'>
            <div className="relative h-full ml-0 mr-0">
                <div className="relative h-full rounded-lg">
                    <div className="flex items-center -mt-1 p-5 pb-0">
                        <Image src={img} alt='icon' width={40} height={40} />
                        <h3 className="my-2 ml-3 text-lg font-bold ">{title}</h3>
                    </div>
                    <hr className="mt-3 mb-3 text-xs font-medium  uppercase" />
                    <p className="mb-2 px-5">
                        {description}
                    </p>
                </div>
            </div>
        </article>
    )
}
