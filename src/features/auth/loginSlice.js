
import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next';

let data = null;
if (typeof window !== 'undefined') {
  data = JSON.parse(localStorage.getItem('name')) || null;
}

const token = getCookie('sessionToken') || null; 

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: token == null ? false : true,
        user: data == null ? {} : data,
        token: token == null ? null : token
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = JSON.parse(localStorage.getItem('name'));
            state.token = token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {};
            state.token = null;
        },
    },
})

export const {login} = loginSlice.actions
export const {logout} = loginSlice.actions

export default loginSlice.reducer