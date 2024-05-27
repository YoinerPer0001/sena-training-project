'use client';

import { useState, useEffect } from 'react';

const usePutFetch = (url) => {
    const [respuesta, setrespuesta] = useState(null);
    const [UpisLoading, setUpIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const doPutFetch = async (id) => {
      setUpIsLoading(true);
        try {
            const response = await fetch(url+id, {
                method: 'PUT',
                body: JSON.stringify({ read: true }), headers: { 'Content-Type': 'application/json' } 
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

