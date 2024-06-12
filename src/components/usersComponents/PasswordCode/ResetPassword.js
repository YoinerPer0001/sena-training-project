import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useApp } from '@/features/AppContext/AppContext';
import { useRouter } from 'next/navigation';

const ResetPassword = ({ email }) => {
    const router = useRouter();
    const { setPageResetPassword } = useApp();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({ estado: false, msg: null });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const resetPassword = (email) => {
        if (!email) {
            toast.error('No hay email');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage({ estado: true, msg: 'Las contraseñas no coinciden.' });
            return;
        }
        fetch('http://localhost:3000/api/v1/users/pass_restart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Ema_User: email,
                newPass: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'success') {
                    setPageResetPassword(1);
                    toast.success('Contraseña restablecida correctamente');
                    router.push('/auth/login');
                } else if (data.code === 403) {
                    setErrorMessage({ estado: true, msg: 'La contraseña debe tener mínimo 8 caracteres.' });
                }
            });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2">
                <Link href={'/'}>
                    <Image src={'/logo-senalearn-(white).png'} width={50} height={50} alt="Logo SENALEARN blanco" />
                </Link>
                <h1 className="text-white font-semibold text-2xl">Restablecer contraseña</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-4/5 md:w-2/4 text-sm text-center flex flex-col items-center gap-2">
                <p>Ingresa y confirma la nueva contraseña.</p>
                <div className='flex flex-col items-center gap-2 w-4/5'>
                    <div className='flex items-center w-full'>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMessage({ estado: false, msg: null });
                            }}
                            placeholder='Ingresa la nueva contraseña'
                            type={passwordVisible ? 'text' : 'password'}
                            className='p-2 text-base w-full rounded-l-lg text-black outline-none'
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className='p-2 bg-white hover:bg-gray-100 rounded-r-lg'
                        >
                            {passwordVisible ? <EyeOff color='#39a900' /> : <Eye color='#39a900' />}
                        </button>
                    </div>
                    <div className='flex items-center w-full'>
                        <input
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrorMessage({ estado: false, msg: null });
                            }}
                            placeholder='Confirma la contraseña'
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            className='p-2 text-base w-full rounded-l-lg text-black outline-none'
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            className='p-2 bg-white hover:bg-gray-100 rounded-r-lg'
                        >
                            {confirmPasswordVisible ? <EyeOff color='#39a900' /> : <Eye color='#39a900' />}
                        </button>
                    </div>
                </div>
                {errorMessage.estado && <span className='text-left w-4/5 bg-red-500 rounded-lg p-2 text-sm flex items-center gap-2'><AlertTriangle size={18} /> {errorMessage.msg}</span>}
                <span className='w-4/5 text-xs'>Nota: Las contraseñas son sensibles a las mayúsculas</span>
                <button onClick={() => resetPassword(email)} className="bg-verdeSena p-2 rounded-lg text-white font-medium">Aceptar</button>
            </form>
        </>
    );
};

export default ResetPassword;
