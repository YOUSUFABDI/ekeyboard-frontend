import { configureStore } from '@reduxjs/toolkit'
import themeConfigSlice from './themeConfigSlice'
import { authApi } from './auth/authApi'

export const store = configureStore({
    reducer: {
        themeConfig: themeConfigSlice,
        [authApi.reducerPath]: authApi.reducer,
    },

    devTools: false,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})

export type IRootState = ReturnType<typeof store.getState>
