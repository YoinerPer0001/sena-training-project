import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/loginSlice';
import { getCookie } from 'cookies-next';
import {jwtDecode} from 'jwt-decode';

// Obtener el token de las cookies al inicializar el store
const token = getCookie('sessionToken') || null;
let userData = {};
if (token) {
    try {
        userData = jwtDecode(token);
    } catch (error) {
        console.error('Invalid token:', error);
        userData = {};
    }
}

const preloadedState = {
    auth: {
        isAuthenticated: token !== null,
        user: userData.user || {},
        token: token,
    },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState, // Inicializar el estado del store con las cookies
});

export default store;