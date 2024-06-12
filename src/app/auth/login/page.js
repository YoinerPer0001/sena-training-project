'use client'
import Link from 'next/link';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DangerMessage from '@/components/usersComponents/DangerMessage/DangerMessage';
import styles from './Login.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '@/features/auth/loginSlice'
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import CircleSpinner from '@/components/usersComponents/CircleSpinner/CircleSpinner';

export default function Login() {
    const classInputs = "my-2 px-3 py-2 rounded-lg outline outline-[1px] outline-gray-500 focus:outline-[#39A900] text-black"
    const { register, handleSubmit, formState: { errors } } = useForm()
    const authState = useSelector(state => state.auth)
    const router = useRouter()
    const [msgError, setErrorMsg] = useState({state: false, msg: ''})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmitTwo = () => {
        dispatch(login())
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const dataJSON = {
                "Ema_User": data.Ema_User,
                "Pass_User": data.Pass_User,
                "Dir_Ip": "192.168.0.1"
            }
    
            const response = await fetch('http://localhost:3000/api/v1/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataJSON)
            })
    
            const responseJSON = await response.json();
            if (responseJSON.type == 'success') {
                if (typeof localStorage !== 'undefined') {
                    try {
                        localStorage.setItem('sessionToken', responseJSON.data);
                        console.log("El token de sesión ha sido guardado en localStorage.");
                    } catch (e) {
                        console.error("Se produjo un error al intentar acceder a localStorage:", e);
                    }
                } else {
                    console.error("localStorage no está definido en este entorno.");
                }
            
                setCookie('sessionToken', responseJSON.data);
                handleSubmitTwo();
                parseJwt(responseJSON.data);
            
                const dataUser = jwtDecode(responseJSON.data);
                setLoading(false);
            
                if (dataUser.user.Id_Rol_FK == 1) {
                    return router.push('/admin/dashboard');
                } else {
                    return router.push('/');
                }
            }
            else if (responseJSON.code == 108) {
                return
            } else if(responseJSON.code == 403) {
                setErrorMsg({state: true, msg: 'Usuario o contraseña incorrecta.'})
                setLoading(false)
            } else if(responseJSON.code == 500) {
                setErrorMsg({state: true, msg: 'Ese correo no está registrado'})
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <main className={styles.main}>
            <section className={styles.section_main}>
                <div>
                    <Image src="/logo-naranja.svg" alt="" width={50} height={50} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white lg:text-[#00324D]">Inicio de sesión</h2>
                <form className="flex flex-col w-full lg:w-3/4 xl:w-2/4" onSubmit={onSubmit}>
                    <input placeholder="Email" type="text" {...(register("Ema_User", {
                        required: {
                            value: true,
                            message: "Este campo es obligatorio"
                        },
                    }))} />
                    {errors.Ema_User && <DangerMessage>{errors.Ema_User.message}</DangerMessage>}
                    <input placeholder="Contraseña" type="password" className={classInputs} {...(register("Pass_User", {
                        required: {
                            value: true,
                            message: "Este campo es obligatorio"
                        },
                    }))} />
                    {errors.Ema_User && <DangerMessage>{errors.Ema_User.message}</DangerMessage>}
                    <div className={`bg-red-200 ${msgError.state == true ? 'flex' : 'hidden'} transition-all duration-150 text-red-600 p-2 rounded-lg text-sm items-center gap-1 mt-1 font-medium`}>
                        <CircleX size={18}/> {msgError.state == true ? msgError.msg : ''}
                    </div>
                    <div className="mt-2">
                        <button type="submit" className="inline-block bg-verdeSena lg:text-white lg:bg-[#00324D] text-white  py-2 px-3 rounded-xl text-base font-semibold hover:bg-black transition-all duration-200 cursor-pointer">{loading ? <CircleSpinner /> : "Iniciar sesión" }</button>
                    </div>
                </form>
                {/* Olvidó su contraseña? */}
                <div className="flex w-full justify-center flex-col sm:flex-row items-center">
                    <div className="mx-5">
                        <Link href="/resetpass" className="underline text-sm sm:text-base text-white lg:text-[#00324D]">¿Olvidó su contraseña?</Link>
                    </div>
                </div>
                {/* ¿No tienes una cuenta? [Mobile] */}
                <div className="flex items-center flex-col my-1">
                    <p className="text-sm md:text-base mx-4 mt-4 inline-block lg:hidden lg:text-[#00324D] text-white">¿No tienes una cuenta? <Link href={"/auth/register"} className="m-1 underline bg-[#39A900] py-1 font-medium px-2 rounded-lg transition-all duration-100 cursor-pointer">Regístrate</Link></p>
                </div>
            </section>
            <section className={styles.section_aside}>
                <h3 className='text-xl font-semibold text-white'>¿No tienes una cuenta?</h3>
                <span className="text-white">No te preocupes, crea una en instantes</span>
                <Link href="./register" id="desktop-register-btn">Registrarse</Link>
            </section>
        </main>
    )
} 