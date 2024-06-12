import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';
import {jwtDecode} from 'jwt-decode';

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

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: token != null,
        user: userData.user || {},
        token: token
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            try {
                const decoded = jwtDecode(action.payload);
                state.user = decoded.user;
            } catch (error) {
                console.error('Invalid token:', error);
                state.user = {};
            }
            state.token = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {};
            state.token = null;
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
