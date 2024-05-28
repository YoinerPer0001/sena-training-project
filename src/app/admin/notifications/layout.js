'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BadgePlus, UserPlus2, CheckCheck } from "lucide-react"

export default function AdminLayout({ children }) {
    const [status, setstatus] = useState(false)

    const pathname = usePathname();
    const page1 = pathname.includes('/admin/notifications')
    const page2 = pathname.includes('/select')
    const page3 = pathname.includes('/send')


    return (

        <div className="w-full h-full items-center flex flex-col ">
            <div className=" w-full flex flex-row h-20 py-4  justify-center bg-[#F1F5F9] items-center">
                <div className=" flex flex-row justify-end items-center  w-full h-full ">
                    <div className={`w-16 h-16 flex justify-center items-center rounded-full ${page1 ? ' bg-verdeSena' : 'bg-[#ffffff] '}`}>
                        <BadgePlus className={`${page1 && 'text-white'} size-8 w-16`} />
                    </div>
                </div>
                <div className=" flex flex-row justify-center items-center  w-full h-full">
                    <hr className={`w-full size-1 ${page1 && 'bg-verdeSena'}`} />
                    <div className={`w-16 h-16 rounded-full flex justify-center items-center ${page2 ? ' bg-verdeSena' : 'bg-[#ffffff]'} `}>
                        <UserPlus2 className={` size-8 w-16  ${page2 && 'text-white'}`} />
                    </div>
                    <hr className={`w-full size-1 ${page2 && 'bg-verdeSena'}`} />

                </div>
                <div className=" flex flex-row items-center justify-start  w-full h-full">
                    <div className={`w-16 h-16 rounded-full flex justify-center items-center ${page3 ? 'bg-verdeSena' : 'bg-[#ffffff]'}`}>
                        <CheckCheck className={`size-8 w-16 ${page3 && 'text-white'}`} />
                    </div>
                </div>

            </div>
            <div className="w-full h-full bg-[#F1F5F9] p-5 flex justify-center items-center">
                {children}
            </div>
        </div>


    );
}