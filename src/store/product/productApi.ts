import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ApiSuccessResponseDT, CreateProductRequest, ProductDT } from '../../lib/types'
import { API } from '../api'

const token = localStorage.getItem('token')

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<ApiSuccessResponseDT<ProductDT[]>, void>({
            query: () => ({
                url: '/product',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['products'],
        }),

        createProduct: builder.mutation<ApiSuccessResponseDT<ProductDT>, CreateProductRequest>({
            query: (requestBody) => ({
                url: '/product/create',
                method: 'POST',
                body: requestBody,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['products'],
        }),

        deleteProduct: builder.mutation<ApiSuccessResponseDT<null>, string>({
            query: (productId) => ({
                url: `/product/remove/${productId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['products'],
        }),
    }),
})

export const { useGetAllProductsQuery, useCreateProductMutation, useDeleteProductMutation } = productApi
