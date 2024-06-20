'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

export const usePostFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const authState = useSelector(state => state.auth);
    const sessionToken = authState.token;

    const postData = useCallback(async (datos) => {
        setIsLoading(true);
        setError(false);

        // let sessionToken = null;

        // if (typeof localStorage !== 'undefined') {
        //     try {
        //         sessionToken = localStorage.getItem('sessionToken');
        //     } catch (e) {
        //         console.error("Se produjo un error al intentar acceder a localStorage:", e);
        //     }
        // } else {
        //     console.warn("localStorage no está definido en este entorno.");
        // }

        try {
            const respuesta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': sessionToken ? `Bearer ${sessionToken}` : '',
                },
                body: JSON.stringify(datos)
            });

            if (!respuesta.ok) {
                if (respuesta.status === 500) {
                    setError(true);
                }
                setIsLoading(false);
                return;
            }

            const result = await respuesta.json();
            setData(result);
            setError(false);
        } catch (e) {
            console.error("Se produjo un error al realizar la solicitud:", e);
            setError(true);
        }

        setIsLoading(false);
    }, [url, sessionToken]);

    return { data, isLoading, error, postData };
};
