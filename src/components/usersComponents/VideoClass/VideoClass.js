import { CldVideoPlayer } from 'next-cloudinary'
import React from 'react'

export default function VideoClass({src}) {
    return (
        <section className='w-full p-4 flex flex-col text-white items-center lg:w-3/4 h-auto md:h-full bg-black'>
            <div className="flex w-full justify-center items-center p-4">
                <CldVideoPlayer
                    width="640"
                    height="360"
                    src={src}
                    className="rounded-lg"
                />
            </div>
            <div className='w-full flex flex-col items-start'>
                <h4 className='text-white font-bold text-2xl'>Introduccion a React</h4>
                <p className='font-medium text-white'>Curso de introduccion a la libreria de Facebook, ReactJS</p>
            </div>
        </section>
    )
}
