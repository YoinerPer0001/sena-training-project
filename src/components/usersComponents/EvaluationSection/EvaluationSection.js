'use client'
import React, { useState } from 'react'
import { RadioGroup, Radio } from "@nextui-org/radio";

export default function EvaluationSection() {
    const [selected, setSelected] = useState([])
    return (
        <section className="w-full p-4 flex flex-col text-white items-center justify-center md:w-3/4 h-auto md:h-full bg-black">
            <div className='w-3/4 mx-auto'>
                <div className='my-4'>
                    <h4 className='text-white font-bold text-3xl mx-auto'>Evaluación</h4>
                    <p className='text-white font-regular mx-auto'>Completa esta evaluación para comprobar tus conocimientos.</p>
                </div>

                <div className='text-white'>
                    <p className='font-semibold text-xl mb-2'>1. ¿Cuál es la capital de Francia?</p>
                    <RadioGroup
                        defaultValue={["buenos-aires", "london"]}
                        classNames={
                            {
                                label: "text-foreground-600"
                            }
                        }
                        value={selected}
                        onValueChange={setSelected}
                        radius='sm'
                    >
                        <Radio className="text-white" value="buenos-aires">Buenos Aires</Radio>
                        <Radio className="text-white" value="sydney">Sydney</Radio>
                        <Radio className="text-white" value="san-francisco">San Francisco</Radio>
                        <Radio className="text-white" value="london">London</Radio>
                        <Radio label="text-white" value="tokyo">Tokyo</Radio>
                    </RadioGroup>
                </div>
                <div className='text-white w-full flex items-center justify-center mt-8'>
                        <span>Pregunta: 1/7</span>
                </div>
                <div className='w-full flex items-center justify-start'>
                    <button className='bg-verdeSena mt-2 mx-auto text-white p-2 rounded-lg font-medium'>Siguiente</button>
                </div>
            </div>
        </section>
    )
}
