'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BadgePlus, UserPlus2, CheckCheck } from "lucide-react"

export default function AdminLayout({ children }) {
    const [status, setstatus] = useState(false)

    const pathname = usePathname();

    return (

        <div className="w-full h-full items-center flex flex-col">
            <div className=" w-full flex flex-row h-20  justify-center items-center">
                <div className=" flex flex-row justify-end items-center  w-full h-full ">
                    <div className=" w-16 h-16 flex justify-center items-center rounded-full  bg-[#E1EFFE] ">
                        <BadgePlus className=" size-8 w-16" />
                    </div>
                </div>
                <div className=" flex flex-row justify-center items-center  w-full h-full">
                    <hr className=" w-full size-1 bg-slate-200" />
                    <div className=" w-16 h-16 rounded-full flex justify-center items-center  bg-[#F3F4F6] ">
                        <UserPlus2 className=" size-8 w-16" />
                    </div>
                    <hr className=" w-full size-1 bg-slate-200" />

                </div>
                <div className=" flex flex-row items-center justify-start  w-full h-full">
                    <div className=" w-16 h-16 rounded-full flex justify-center items-center  bg-[#F3F4F6]">
                        <CheckCheck className=" size-8 w-16" />
                    </div>
                </div>

            </div>
            <div className="w-full h-full ">
                {children}
            </div>
        </div>


    );
}