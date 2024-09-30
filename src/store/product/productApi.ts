import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '../api'
import { ApiSuccessResponseDT, ProductDT } from '../../lib/types'

const token = localStorage.getItem('token')

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
    tagTypes: ['productApi'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<ApiSuccessResponseDT<ProductDT[]>, void>({
            query: () => ({
                url: '/product',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['productApi'],
        }),
    }),
})

export const { useGetAllProductsQuery } = productApi
