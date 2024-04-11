
import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
})

export const {login} = loginSlice.actions
export const {logout} = loginSlice.actions

export default loginSlice.reducer