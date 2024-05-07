import { BadgeCheck, Clapperboard, Pencil, Trash2, VideoOff } from "lucide-react";
import Image from "next/image";

export default function Profile() {
    return (
        <section className="w-full h-screen max-h-screen p-4 rounded-lg box-border">
            <div className="bg-gray-100 flex flex-col h-full items-center gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
                <div className="flex items-center gap-2">
                    <div className="bg-white w-[300px] flex flex-col items-center p-3 rounded-xl justify-center">
                        <picture className="relative flex w-full items-center justify-center">
                            <Image
                                src="https://res.cloudinary.com/dla5djfdc/image/upload/v1712821257/blank-avatar-photo-place-holder-600nw-1095249842_a6kf0c.webp"
                                alt="Profile"
                                width={100}
                                height={100}
                                className="rounded-full border-3 border-azulSena relative z-10"
                            />
                        </picture>
                        <button className="bg-azulSena hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2">
                            Actualizar foto
                        </button>
                    </div>
                    <div className="bg-white w-[300px] flex flex-col items-center p-3 rounded-xl">
                        <h4 className="p-2 font-bold text-xl">Mi cuenta</h4>
                        <form className="flex flex-col gap-2">
                            <div>
                                <label className="text-sm font-semibold">
                                    Nombres:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Steven"
                                    className="outline-none border-1 border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold">
                                    Apellidos:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Gonzalez"
                                    className="outline-none border-1 border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold">
                                    Nombres:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Steven"
                                    className="outline-none border-1 border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    placeholder="ejemplo@gmail.com"
                                    className="outline-none border-1 border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold">
                                    Telefono:
                                </label>
                                <input
                                    type="text"
                                    placeholder="+57 3017403956"
                                    className="outline-none border-1 border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                            <button className="bg-azulSena hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2">
                                Actualizar perfil
                            </button>
                        </form>
                    </div>
                </div>
                <hr className="w-full" />
                <div className="flex flex-col gap-2">
                    <h1 className="text-center font-bold text-2xl"> Mi progreso </h1>
                    <div className="flex gap-2">
                        <a className="min-w-[200px] cursor-pointer">
                            <div className="bg-green-200 p-2 rounded-lg flex gap-3 items-center border-2 border-transparent hover:border-green-600 transition-all duration-150">
                                <div>
                                    <Clapperboard
                                        color="rgb(22,163,74)"
                                        size={35}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-green-600 text-3xl">
                                        4
                                    </h4>
                                    <span className="text-green-600 text-sm font-medium">
                                        Cursos completados
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a className="min-w-[200px] cursor-pointer">
                            <div className="bg-blue-200 p-2 rounded-lg flex gap-3 items-center border-2 border-transparent hover:border-blue-600 transition-all duration-150">
                                <div>
                                    <VideoOff
                                        color="rgb(37,99,235)"
                                        size={35}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-blue-600 text-3xl">
                                        12
                                    </h4>
                                    <span className="text-blue-600 text-sm font-medium">
                                        Cursos en progreso
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a className="min-w-[200px] cursor-pointer">
                            <div className="bg-amber-200 p-2 rounded-lg flex gap-3 items-center border-2 border-transparent hover:border-amber-600 transition-all duration-150">
                                <div>
                                    <BadgeCheck
                                        color="rgb(217,119,6)"
                                        size={35}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-amber-600 text-3xl">
                                        5
                                    </h4>
                                    <span className="text-amber-600 text-sm font-medium">
                                        Certificados
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
