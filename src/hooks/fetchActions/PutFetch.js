'use client';

import { useState, useEffect } from 'react';

const usePutFetch = (url) => {
    const [respuesta, setrespuesta] = useState(null);
    const [UpisLoading, setUpIsLoading] = useState(true);
    const [error, setError] = useState(null);

    let sessionToken = null;

    if (typeof localStorage !== 'undefined') {
        try {
            sessionToken = localStorage.getItem('sessionToken');
        } catch (e) {
            console.error("Se produjo un error al intentar acceder a localStorage:", e);
        }
    } else {
        console.warn("localStorage no está definido en este entorno.");
    }

    const doPutFetch = async (id, data) => {
        setUpIsLoading(true);
        try {
            const response = await fetch(url + id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': sessionToken ? `Bearer ${sessionToken}` : '',
                },
            });
            const result = await response.json();
            setrespuesta(result);
        } catch (error) {
            setError(error);
        } finally {
            setUpIsLoading(false);
        }
    };

    return { respuesta, UpisLoading, error, doPutFetch };
};

export default usePutFetch;

