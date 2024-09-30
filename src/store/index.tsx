import { configureStore } from '@reduxjs/toolkit'
import themeConfigSlice from './themeConfigSlice'
import { authApi } from './auth/authApi'
import { productApi } from './product/productApi'

export const store = configureStore({
    reducer: {
        themeConfig: themeConfigSlice,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },

    devTools: false,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
})

export type IRootState = ReturnType<typeof store.getState>
