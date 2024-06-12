'use client'
import { NavHome } from '@/components/usersComponents/Nav/NavHome'
import { Check, Edit, EditIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import capitalize from 'capitalize';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';
import { Footer } from '@/components/usersComponents/Footer/Footer';
import { capitalizestr } from '@/utils/utils';
import Link from 'next/link';

export default function ProfileUser() {
    const [dataUser, setDataUser] = useState({});
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);
    const authState = useSelector(state => state.auth)
    const user = authState.user
    console.log(user)

    const token = getCookie("sessionToken");
    const router = useRouter();

    useEffect(() => {
        setLoading(false);
    }, []);

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



    // subir imagen

    let image = null;
    const [progressBar, setProgressBar] = useState(false);

    const formSubmit = async ({ files }) => {
        const [file] = files;
        const form = new FormData();
        form.append("file", file);
        setProgressBar(true);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: form
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            image = data.file;

            if (data.message === "File uploaded successfully" && image) {
                const updateResponse = await fetch(
                    `http://localhost:3000/api/v1/users/update/${user.Id_User}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ Fot_User: image }),
                    }
                );

                const updateData = await updateResponse.json();

                if (updateData.type === "success") {
                    setProgressBar(false);
                    toast.success("Se guardo la imagen correctamente.");
                    return location.reload();
                } else {
                    setProgressBar(false);
                    console.error("Failed to update course with image:", updateData);
                }
            } else {
                setProgressBar(false);
                console.error("No se cargo la imagen");
            }
        } catch (e) {
            setProgressBar(false);
            console.error("Error during form submission: ", e);
        }
    };

    return (
        loading ? <div className='h-screen w-screen flex justify-center items-center'><Spinner /></div> : (
            <>
                <NavHome />
                <main className='my-10'>
                    <section>
                        <div className="flex max-w-[1024px] mx-auto w-full h-full justify-center items-start gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
                            <div className=" w-[300px] flex flex-col items-center p-3 rounded-xl justify-center">
                                <picture className="relative flex items-center justify-center">
                                    <label for='input-upload-userphoto'><EditIcon /></label>
                                    <input id='input-upload-userphoto' multiple='false' type='file' className='absolute bg-azulSena hover:bg-black transition-all duration-150 rounded-full p-1 text-white z-20 top-0 right-0' />
                                    <Image
                                        src={user?.Fot_User !== null ? user?.Fot_User : "https://res.cloudinary.com/dla5djfdc/image/upload/v1712821257/blank-avatar-photo-place-holder-600nw-1095249842_a6kf0c.webp"}
                                        alt="Profile"
                                        priority={true}
                                        width={100}
                                        height={100}
                                        className="rounded-full border-3 border-azulSena relative z-10"
                                    />
                                </picture>
                                <span className='leading-5 mt-1 font-semibold'>{!loading ? capitalizestr(user?.Nom_User) + " " + capitalizestr(user?.Ape_User) : 'Cargando...'}</span>
                                <span className='leading-4 mb-1 font-medium text-sm text-gray-700'>{user?.Id_Rol_FK == 1 ? 'Administrador' : user?.Id_Rol_FK == 2 ? 'Instructor' : 'Estudiante'}</span>
                            </div>
                            <div className='flex flex-col w-full gap-4 items-center justify-center'>
                                <div className="flex items-center w-full gap-2">
                                    <div className="bg-white flex flex-col border-gray-300 border-1 w-full items-start justify-items-center  p-4 rounded-xl">
                                        <h4 className="font-semibold text-xl text-left w-full">Información de la cuenta</h4>
                                        <hr className="border-gray-200 w-full my-2" />
                                        <form className="flex flex-col gap-2 items-start w-full">
                                            <div className="w-full">
                                                <label className="text-sm font-semibold">
                                                    Nombres:
                                                </label>
                                                <input
                                                    onChange={handleChangeNombre}
                                                    name={"Nom_User"}
                                                    type="text"
                                                    placeholder='Introduce tus nombres'
                                                    defaultValue={user?.Nom_User}
                                                    className="outline-none border-1 font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="text-sm font-semibold">
                                                    Apellidos:
                                                </label>
                                                <input
                                                    onChange={handleChangeApellido}
                                                    name={"Ape_User"}
                                                    type="text"
                                                    placeholder='Introduce tus apellidos'
                                                    defaultValue={user?.Ape_User}
                                                    className="outline-none border-1 font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                                />
                                            </div>
                                            <div className='w-full'>
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
                                                        user?.Tel_User ? user?.Tel_User : ""
                                                    }
                                                    className="outline-none border-1 font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                                />
                                            </div>
                                        </form>
                                        <button
                                            disabled={`${Object.keys(editData).length === 0 ? true : false}`}
                                            className={`bg-azulSena flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2`}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center w-full gap-2 border-gray-300 border-1 rounded-lg">
                                    <div className="bg-white flex flex-col w-full items-start justify-items-center  p-4 rounded-xl">
                                        <h4 className=" font-semibold text-xl text-left w-full">Correo electrónico</h4>
                                        <hr className="border-gray-200 w-full my-2" />
                                        <form className="flex flex-col items-start w-full">
                                            <label className="text-sm font-semibold">
                                                Email:
                                            </label>
                                            <div className="flex items-center gap-2 w-full">
                                                <div className="flex flex-col w-full">
                                                    <input
                                                        onChange={handleChangeEmail}
                                                        name={"Ema_User"}
                                                        type="email"
                                                        placeholder="Introduce tu correo electrónico"
                                                        defaultValue={user?.Ema_User}
                                                        className="outline-none border-1 placeholder:font-regular font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                                    />

                                                </div>
                                                <div
                                                    className={
                                                        user?.Est_Email_User === 0
                                                            ? "text-red-500 rounded-lg font-medium flex items-center gap-2 w-full justify-between"
                                                            : "text-green-500 rounded-lg font-medium flex items-center gap-2"
                                                    }
                                                >
                                                    {user?.Est_Email_User === 0 ? (
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
                                            disabled={`${Object.keys(editData)?.length === 0 ? true : false}`}
                                            className={`bg-azulSena flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2`}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center w-full gap-2 border-gray-300 border-1 rounded-lg">
                                    <div className="bg-white flex flex-col w-full items-start justify-items-center  p-4 rounded-xl">
                                        <h4 className="font-semibold text-xl text-left w-full">Cambiar contraseña</h4>
                                        <hr className="border-gray-200 w-full my-2" />
                                        <form className="flex flex-col items-start w-full">
                                            <label className="text-sm font-semibold">
                                                Contraseña actual:
                                            </label>
                                            <div className="flex items-center gap-2 w-full">
                                                <div className="flex flex-col w-full">
                                                    <input
                                                        onChange={handleChangeEmail}
                                                        name={"Ema_User"}
                                                        type="password"
                                                        placeholder="********"
                                                        defaultValue={dataUser?.Ema_User}
                                                        className="outline-none border-1 placeholder:font-regular font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                                    />
                                                    <span className='text-sm'>¿Olvidaste la contraseña? <Link href={'/resetpass'} className='underline font-medium text-sm text-verdeSena'>Restablecer contraseña</Link></span>
                                                </div>
                                            </div>
                                            <label className="text-sm font-semibold mt-2">
                                                Nueva contraseña:
                                            </label>
                                            <div className="flex items-center gap-2 w-full">
                                                <div className="flex flex-col w-full">
                                                    <input
                                                        onChange={handleChangeEmail}
                                                        name={"Ema_User"}
                                                        type="password"
                                                        placeholder="********"
                                                        defaultValue={dataUser?.Ema_User}
                                                        className="outline-none border-1 placeholder:font-regular font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                                    />

                                                </div>
                                            </div>
                                            <label className="text-sm font-semibold mt-2">
                                                Repite la contraseña:
                                            </label>
                                            <div className="flex items-center gap-2 w-full">
                                                <div className="flex flex-col w-full">
                                                    <input
                                                        onChange={handleChangeEmail}
                                                        name={"Ema_User"}
                                                        type="password"
                                                        placeholder="********"
                                                        defaultValue={dataUser?.Ema_User}
                                                        className="outline-none border-1 placeholder:font-regular font-medium border-azulSena px-2 py-1 rounded-lg w-full"
                                                    />

                                                </div>
                                            </div>
                                        </form>
                                        <span className='text-sm font-medium my-1 text-gray-600'>Nota: La contraseña debe tener un mínimo de 8 caracteres.</span>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                disabled={`${Object.keys(editData)?.length === 0 ? true : false}`}
                                                className={`bg-azulSena flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black duration-200 transition-all text-white p-2 rounded-lg mt-2`}
                                            >
                                                Cambiar
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        )

    )
}
