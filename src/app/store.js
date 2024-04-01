import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/auth/loginSlice';

export const store = configureStore({
    reducer: {
        auth: loginReducer
    },
})