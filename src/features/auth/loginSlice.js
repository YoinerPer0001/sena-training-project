import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {},
        token: null,
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