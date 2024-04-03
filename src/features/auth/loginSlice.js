import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: true,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            console.log(state, action);
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
})

export const {login} = loginSlice.actions

export default loginSlice.reducer