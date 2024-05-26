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
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
          }
        });
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
