import { createSlice, configureStore } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
    },
    reducers: {
        login(state) {
            state.isLogin = false
        },
        logOut(state) {
            state.isLogin = false
        }
    }
})

export const authAction = authSlice.actions


export const store = configureStore({
    reducer: authSlice.reducer,
})
