"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Video, X } from "lucide-react";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

const Page = () => {
    const [aside, setAside] = useState();

    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium text-white",
        trigger:
            "px-2 py-0 data-[hover=true]:bg-gray-800 rounded-lg h-14 flex items-center transition-all duration-150",
        indicator: "text-medium text-white",
        content: "text-small px-2 text-white",
    };

    return (
        <>
            <section className="w-3/4 bg-black">
                <div className="flex justify-center items-center">
                    <CldVideoPlayer
                        width="1920"
                        height="1080"
                        src="https://res.cloudinary.com/dnarhjdqu/video/upload/v1715347433/Una_hackathon_de_Midudev_fue_cancelada_dvkhvx.mp4"
                        className="rounded-lg w-3/4"
                    />
                </div>
            </section>
            <section className="w-1/4 p-2 overflow-y-auto text-white bg-gray-900 border-l-2 border-gray-700 relative">
                <div className="relative w-full flex justify-center items-center">
                    <button className="p-2 text-white absolute left-2 hover:bg-black transition-all duration-150 rounded-lg">
                        <X />
                    </button>
                    <h4 className="font-bold text-xl text-center my-2">
                        Contenido del curso
                    </h4>
                </div>
                <Accordion
                    variant="light"
                    className="text-white rounded-lg p-2"
                    defaultExpandedKeys={["1"]}
                    selectionMode="multiple"
                    itemClasses={itemClasses}
                >
                    <AccordionItem
                        key="1"
                        aria-label="Accordion 1"
                        title="Modulo 1: Introducción"
                        subtitle="2/5 clases"
                        className="text-white"
                    >
                        <div className="rounded-lg flex flex-col gap-1">
                            <div className="flex items-center gap-1 rounded-lg bg-gray-900 border-gray-300 transition-all duration-150 hover:bg-gray-800 px-2 py-3 cursor-pointer">
                                <Video /> Introducción
                            </div>
                            <div className="flex items-center gap-1 rounded-lg bg-gray-900 border-gray-300 transition-all duration-150 hover:bg-gray-800 px-2 py-3 cursor-pointer">
                                <Video /> Conceptos básicos
                            </div>
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="2"
                        aria-label="Accordion 2"
                        title="Modulo 2: ¡Coding!"
                        subtitle="0/6 clases"
                    >
                        <div className="rounded-lg flex flex-col gap-1">
                            <div className="flex items-center gap-1 rounded-lg bg-gray-900 border-gray-300 transition-all duration-150 hover:bg-gray-800 px-2 py-3 cursor-pointer">
                                <Video /> Introducción
                            </div>
                            <div className="flex items-center gap-1 rounded-lg bg-gray-900 border-gray-300 transition-all duration-150 hover:bg-gray-800 px-2 py-3 cursor-pointer">
                                <Video /> Conceptos básicos
                            </div>
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="3"
                        aria-label="Accordion 3"
                        title="Modulo 3: Proyecto"
                        subtitle="0/3 clases"
                    >
                        <div className="rounded-lg flex flex-col gap-1">
                            <div className="flex items-center gap-1 rounded-lg bg-gray-900 border-gray-300 transition-all duration-150 hover:bg-gray-800 px-2 py-3 cursor-pointer">
                                <Video /> Introducción
                            </div>
                            <div className="flex items-center gap-1 rounded-lg bg-gray-900 border-gray-300 transition-all duration-150 hover:bg-gray-800 px-2 py-3 cursor-pointer">
                                <Video /> Conceptos básicos
                            </div>
                        </div>
                    </AccordionItem>
                </Accordion>
            </section>
        </>
    );
};

export default Page;
