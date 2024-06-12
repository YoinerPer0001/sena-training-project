import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link'
import { InputOtp } from 'primereact/inputotp';
import toast from 'react-hot-toast';
import { useApp } from '@/features/AppContext/AppContext';


const PasswordCode = ({email}) => {
    const [token, setTokens] = useState();
    const { setPageResetPassword } = useApp();

    const verifyCode = (code, email) => {
        if(!code || !email) return

        fetch('http://localhost:3000/api/v1/users/pass_restart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Ema_User: email,
                codigo: code
            })
        })
        .then(response => response.json())
        .then(response => {
             if(response.type === 'success'){
                setPageResetPassword(3)
             } else if (response.message === 'Invalid token') {
                toast.error('El código no es valido.')
             } else if (response.message === 'Expired token'){
                toast.error('Código expirado, envíalo nuevamente.')
             }
        })
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2">
                <Link href={'/'}>
                    <Image src={'/logo-senalearn-(white).png'} width={50} height={50} alt="Logo SENALEARN blanco" />
                </Link>
                <h1 className="text-white font-semibold text-2xl">Restablecer contraseña</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-4/5 md:w-2/4 text-sm text-center flex flex-col items-center gap-2">
                <p>Ingresa el código que te llego al correo para seguir con el proceso.</p>
                <div className="flex justify-content-center">
                    <InputOtp length={6} value={token} onChange={(e) => {
                        setTokens(e.value)
                    }} pt={
                        {
                            root: 'text-black flex gap-3 my-2',
                            input: 'outline-none rounded-lg p-2 w-[40px] h-[40px] text-center font-semibold text-base',
                        }
                    }/>
                </div>
                <button onClick={() => verifyCode(token, email)} className="bg-verdeSena p-2 rounded-lg text-white font-medium">Enviar</button>
            </form>
        </>
    )
}

export default PasswordCode