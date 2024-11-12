import { configureStore } from '@reduxjs/toolkit'
import themeConfigSlice from './themeConfigSlice'
import authReducer from './slices/authSlice'
import { authApi } from './auth/authApi'
import { productApi } from './product/productApi'
import { categoryApi } from './category/categoryApi'

export const store = configureStore({
    reducer: {
        themeConfig: themeConfigSlice,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, categoryApi.middleware),
})

export type IRootState = ReturnType<typeof store.getState>
