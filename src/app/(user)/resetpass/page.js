'use client'
import PasswordCode from "@/components/usersComponents/PasswordCode/PasswordCode";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useApp } from '@/features/AppContext/AppContext';
import CircleSpinner from "@/components/usersComponents/CircleSpinner/CircleSpinner";
import ResetPassword from "@/components/usersComponents/PasswordCode/ResetPassword";

const ResetPass = () => {
    const [email, setEmail] = useState(null)
    const [page, setPage] = useState(2)
    const [loading, setLoading] = useState(false)
    const { pageResetPassword, setPageResetPassword } = useApp();
    const handleEmail = (e) => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (email === null || email === undefined || !email.includes('@')) {
            toast.error('Ingresa un correo electrónico válido')
            return
        }
        fetch(`http://localhost:3000/api/v1/users/pass_restart/${email}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.type === 'success') {
                    toast.success('El código se envió correctamente.')
                    setPageResetPassword(2)
                    setLoading(false)
                } else {
                    toast.error(response.message === 'User not found' && 'No se encontró este correo.')
                    setLoading(false)
                }
            })
    }
    return (
        <div className="bg-azulSena w-screen h-screen border-b-[12px] border-verdeSena overflow-hidden text-white flex items-center gap-4 justify-center flex-col">
            {pageResetPassword == 1 &&
                <>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Link href={'/'}>
                            <Image src={'/logo-senalearn-(white).png'} width={50} height={50} alt="Logo SENALEARN blanco" />
                        </Link>
                        <h1 className="text-white font-semibold text-2xl">Restablecer contraseña</h1>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="w-4/5 md:w-2/4 text-sm text-center flex flex-col items-center gap-2">
                        <p>Ingresa tu correo electrónico vinculado a tu cuenta, te enviaremos un código para que puedas restablecer tu contraseña.</p>
                        <input onChange={handleEmail} type="email" className="w-full text-black md:w-2/4 focus:outline focus:outline-1 focus:outline-verdeSena p-2 rounded-lg my-2" placeholder="Introduce tu correo." />
                        <button onClick={handleSubmit} className="bg-white p-2 rounded-lg text-azulSena font-semibold hover:bg-verdeSena hover:text-white transition-all duration-150">{loading ? <CircleSpinner /> : "Enviar"}</button>
                    </form>
                </>}
            {pageResetPassword == 2 &&
                <PasswordCode email={email} />}
            {pageResetPassword == 3 &&
                <ResetPassword email={email} />}
        </div>
    )
}

export default ResetPass;
