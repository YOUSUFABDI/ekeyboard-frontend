import { configureStore } from '@reduxjs/toolkit'
import themeConfigSlice from './themeConfigSlice'
import { authApi } from './auth/authApi'
import { productApi } from './product/productApi'
import { categoryApi } from './category/categoryApi'
import { orderApi } from './order/OrderApi'
import { dashboardApi } from './dashboard/dashboard'
import cartReducer from './order/cartSlice'

export const store = configureStore({
    reducer: {
        themeConfig: themeConfigSlice,
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, categoryApi.middleware, orderApi.middleware, dashboardApi.middleware),
})

export type IRootState = ReturnType<typeof store.getState>
