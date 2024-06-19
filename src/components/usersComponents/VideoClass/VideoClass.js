import { CldVideoPlayer } from 'next-cloudinary'
import React from 'react'

export default function VideoClass({src}) {
    return (
        <section className="w-full md:w-3/4 h-auto md:h-full bg-black">
            <div className="flex h-full justify-center items-center p-4">
                <CldVideoPlayer
                    width="1280"
                    height="720"
                    src={src}
                    className="rounded-lg w-3/4"
                />
            </div>
        </section>
    )
}
