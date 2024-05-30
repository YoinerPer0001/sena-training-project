import Image from "next/image"

export default function sendPage() {
    return (
        <div className=" w-full p-4 lg:w-2/3 rounded-md shadow-md h-full flex flex-col justify-center items-center bg-white">
            <Image src={'/Check-Image.png'} width={200} height={200} alt="checkphoto" priority />
            <h1 className="block tracking-wide text-gray-700  text-xl font-bold mt-2 text-center mb-2">Notificacion enviada exitosamente</h1>
        </div>
    )
}