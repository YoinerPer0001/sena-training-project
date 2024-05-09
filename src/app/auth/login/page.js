'use client'
import Link from 'next/link';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DangerMessage from '@/components/DangerMessage/DangerMessage';
import styles from './Login.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '@/features/auth/loginSlice'
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

export default function Login() {
    const classInputs = "my-2 px-3 py-2 rounded-lg outline outline-[1px] outline-gray-500 focus:outline-[#39A900] text-black"
    const { register, handleSubmit, formState: { errors } } = useForm()
    const authState = useSelector(state => state.auth)
    const router = useRouter()

    // Decencriptar token
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const data = JSON.parse(jsonPayload)
        return localStorage.setItem('name', JSON.stringify(data.user));
    }
    

    const [msgError, setErrorMsg] = useState({state: false, msg: ''})

    const dispatch = useDispatch()

    const handleSubmitTwo = () => {
        dispatch(login())
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event.preventDefault();

        const dataJSON = {
            "Ema_User": data.Ema_User,
            "Pass_User": data.Pass_User,
            "Dir_Ip": "198.168.0.1"
        }

        const response = await fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataJSON)
        })

        const responseJSON = await response.json();
        if (responseJSON.type == 'success') {
            localStorage.setItem('sessionToken', responseJSON.data);
            setCookie('sessionToken', responseJSON.data);
            handleSubmitTwo()
            parseJwt(responseJSON.data)
            return router.push('/')
        }
        else if (responseJSON.code == 108) {
            return
        } else if(responseJSON.code == 403) {
            setErrorMsg({state: true, msg: 'Usuario o contraseña incorrecta.'})
        } else if(responseJSON.code == 500) {
            setErrorMsg({state: true, msg: 'Ese correo no está registrado'})
        }
        // login(tokens.result.data.codigo)

        // return window.location.href = '/'
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
                        <button type="submit" className="inline-block bg-[#39A900] lg:text-white lg:bg-[#00324D] text-white  py-2 px-3 rounded-xl text-base font-semibold hover:bg-black transition-all duration-200 cursor-pointer">Iniciar sesión</button>
                    </div>
                </form>
                {/* Olvidó su contraseña? */}
                <div className="flex w-full justify-center flex-col sm:flex-row items-center">
                    <div className="mx-5">
                        <Link href="" className="underline text-sm sm:text-base text-white lg:text-[#00324D]">¿Olvidó su contraseña?</Link>
                    </div>
                </div>
                {/* ¿No tienes una cuenta? [Mobile] */}
                <div className="flex items-center flex-col my-1">
                    <p className="text-sm md:text-base mx-4 mt-4 inline-block lg:hidden lg:text-[#00324D] text-white">¿No tienes una cuenta? <Link href={"/auth/register"} className="m-1 underline bg-[#39A900] py-1 font-medium px-2 rounded-lg transition-all duration-100 cursor-pointer">Regístrate</Link></p>
                </div>
                {/* Auth con redes sociales */}
                <div className="w-2/4 flex flex-col justify-center items-center mt-4">
                    <hr className="block sm:hidden w-full border-t-0 border-l-0 border-r-0 border-b-1 border-white lg:border-black mb-2"/>
                    <div className="flex items-center justify-evenly gap-2 mb-2">
                        <hr className="hidden sm:block w-[40px] border-t-0 border-l-0 border-r-0 border-b-1 border-white lg:border-black" />
                        <span className="text-white lg:text-black flex-3">o accede con</span>
                        <hr className="hidden sm:block w-[40px] border-t-0 border-l-0 border-r-0 border-b-1 border-white lg:border-black" />
                    </div>
                    <div className="flex gap-3">
                        <svg className="bg-[#00324D] p-1 rounded-full hover:scale-125 transition-all duration-200 cursor-pointer bi bi-google" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                        <svg className="bg-[#00324D] p-1 rounded-full hover:scale-125 transition-all duration-200 cursor-pointer bi bi-facebook" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                        </svg>
                    </div>
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