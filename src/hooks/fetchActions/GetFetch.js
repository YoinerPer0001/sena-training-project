'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

export const useGetFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let sessionToken = null;

        // Verificar si localStorage está definido
        if (typeof localStorage !== 'undefined') {
          try {
            sessionToken = localStorage.getItem('sessionToken');
          } catch (e) {
            console.error("Se produjo un error al intentar acceder a localStorage:", e);
          }
        } else {
          console.warn("localStorage no está definido en este entorno.");
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionToken ? `Bearer ${sessionToken}` : '',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};

