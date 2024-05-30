"use client";
import {
    BadgeCheck,
    Check,
    CircleCheck,
    CircleX,
    Clapperboard,
    Pencil,
    Save,
    Trash2,
    VideoOff,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/usersComponents/Spinner/Spinner";

export default function Profile() {
    const [dataUser, setDataUser] = useState({});
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);

    const token = getCookie("sessionToken");
    const router = useRouter();

    useEffect(() => {
        let user;
        if (typeof localStorage !== 'undefined') {
            user = JSON.parse(localStorage.getItem("name"));
        }
        if (user) {
            const idUser = user.Id_User;
            fetch(`http://localhost:3000/api/v1/users/${idUser}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
                .then(response => response.json())
                .then(response => {
                    if (response.code === 403) {
                        return router.push("/403")
                    }
                    setDataUser(response.data);
                    setLoading(false);
                });
        } else {
            console.log("User not found");
        }
    }, [router, token]);

    const handleChangeEmail = e => {
        setEditData(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Ema_User: e.target.value,
        }));
        console.log(editData);
    };

    const handleChangeNombre = e => {
        setEditData(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Nom_User: e.target.value,
        }));
        console.log(editData);
    };

    const handleChangeApellido = e => {
        setEditData(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Ape_User: e.target.value,
        }));
        console.log(editData);
    };

    const handleChangeTel = e => {
        setEditData(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Tel_User: e.target.value,
        }));
        console.log(editData);
    };

    const editFunction = () => {
        if (Object.keys(editData).length === 0) {
            console.log("editData está vacío, no se ejecutará el fetch.");
            return toast.error(
                "No se pudo editar el perfil, intenta de nuevo."
            );
        }
        try {
            fetch(
                `http://localhost:3000/api/v1/users/update/${dataUser.Id_User}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(editData),
                }
            )
                .then(response => response.json())
                .then(response => {
                    if (response.type == "success") {
                        toast.success("Se editó el perfil correctamente.");
                        return router.refresh();
                    } else {
                        toast.error(
                            "No se pudo editar el perfil, intenta de nuevo."
                        );
                    }
                });
        } catch (err) {
            console.log("Error: " + err);
        }
    };

    return (
        loading ? (
            <div className="bg-gray-100 flex flex-col h-full justify-center items-center gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
                <Spinner />
            </div>
        ) : (
            <div className="bg-gray-100 flex flex-col h-full justify-center items-center gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
                <div className=" w-[300px] flex flex-col items-center p-3 rounded-xl justify-center">
                    <picture className="relative flex w-full items-center justify-center">
                        <Image
                            src="https://res.cloudinary.com/dla5djfdc/image/upload/v1712821257/blank-avatar-photo-place-holder-600nw-1095249842_a6kf0c.webp"
                            alt="Profile"
                            priority={true}
                            width={100}
                            height={100}
                            className="rounded-full border-3 border-azulSena relative z-10"
                        />
                    </picture>
                    <button className="bg-azulSena hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2">
                        Actualizar foto
                    </button>
                </div>
                <div className="flex items-center w-2/4 gap-2">
                    <div className="bg-white flex flex-col w-full items-start justify-items-center  p-4 rounded-xl">
                        <h4 className="font-semibold text-xl text-left w-full">Información de la cuenta</h4>
                        <hr className="border-gray-200 w-full my-2"/>
                        <form className="flex flex-col gap-2 items-start w-full">
                            <div className="w-2/4">
                                <label className="text-sm font-semibold">
                                    Nombres:
                                </label>
                                <input
                                    onChange={handleChangeNombre}
                                    name={"Nom_User"}
                                    type="text"
                                    defaultValue={dataUser.Nom_User}
                                    className="outline-none border-1 font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                            <div className="w-2/4">
                                <label className="text-sm font-semibold">
                                    Apellidos:
                                </label>
                                <input
                                    onChange={handleChangeApellido}
                                    name={"Ape_User"}
                                    type="text"
                                    defaultValue={dataUser.Ape_User}
                                    className="outline-none border-1 font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold">
                                    Teléfono:
                                </label>
                                <input
                                    onChange={handleChangeTel}
                                    name={"Tel_User"}
                                    type="tel"
                                    maxLength={10}
                                    placeholder="Agrega tu número de teléfono."
                                    defaultValue={
                                        dataUser.Tel_User ? dataUser.Tel_User : ""
                                    }
                                    className="outline-none border-1 font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                />
                            </div>
                        </form>
                        <button
                            disabled={`${Object.keys(editData).length === 0 ? true : false}`}
                            onClick={editFunction}
                            className={`bg-azulSena flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2`}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
                <div className="flex items-center w-2/4 gap-2">
                    <div className="bg-white flex flex-col w-full items-start justify-items-center  p-4 rounded-xl">
                        <h4 className=" font-semibold text-xl text-left w-full">Correo electrónico</h4>
                        <hr className="border-gray-200 w-full my-2"/>
                        <form className="flex flex-col items-start w-full">
                            <label className="text-sm font-semibold">
                                Email:
                            </label>
                            <div className="flex items-center gap-2 w-full">
                                <div className="flex flex-col w-2/4">
                                    <input
                                        onChange={handleChangeEmail}
                                        name={"Ema_User"}
                                        type="email"
                                        placeholder="Introduce tu correo electrónico"
                                        defaultValue={dataUser.Ema_User}
                                        className="outline-none border-1 placeholder:font-regular font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                    />

                                </div>
                                <div
                                    className={
                                        dataUser.Est_Email_User === 0
                                            ? "text-red-500 rounded-lg font-medium flex items-center gap-2 w-full justify-between"
                                            : "text-green-500 rounded-lg font-medium flex items-center gap-2"
                                    }
                                >
                                    {dataUser.Est_Email_User === 0 ? (
                                        <>
                                            <button className="px-2 py-[5px] text-white rounded-md bg-red-500 transition-all duration-150 hover:bg-red-600">Verificar</button>
                                        </>
                                    ) : (
                                        <>
                                            Verificado <Check size={20} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </form>
                        <button
                            disabled={`${Object.keys(editData).length === 0 ? true : false}`}
                            onClick={editFunction}
                            className={`bg-azulSena flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2`}
                        >
                            Editar
                        </button>
                    </div>
                </div>
                <div className="flex items-center w-2/4 gap-2">
                    <div className="bg-white flex flex-col w-full items-start justify-items-center  p-4 rounded-xl">
                        <h4 className="font-semibold text-xl text-left w-full">Cambiar contraseña</h4>
                        <hr className="border-gray-200 w-full my-2"/>
                        <form className="flex flex-col items-start w-full">
                            <label className="text-sm font-semibold">
                                Email:
                            </label>
                            <div className="flex items-center gap-2 w-full">
                                <div className="flex flex-col w-2/4">
                                    <input
                                        onChange={handleChangeEmail}
                                        name={"Ema_User"}
                                        type="email"
                                        placeholder="Introduce tu correo electrónico"
                                        defaultValue={dataUser.Ema_User}
                                        className="outline-none border-1 placeholder:font-regular font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                    />

                                </div>
                            </div>
                        </form>
                        <button
                            disabled={`${Object.keys(editData).length === 0 ? true : false}`}
                            onClick={editFunction}
                            className={`bg-azulSena flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2`}
                        >
                            Cambiar
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
