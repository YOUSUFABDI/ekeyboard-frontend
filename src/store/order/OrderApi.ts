import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '../api'
import { ApiSuccessResponseDT, MakeOrderRequestDT } from '../../lib/types'

const token = localStorage.getItem('token')

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
    tagTypes: ['orders'],
    endpoints: (builder) => ({
        makeOrder: builder.mutation<ApiSuccessResponseDT<null>, MakeOrderRequestDT>({
            query: (orderData) => ({
                url: '/orders/make-order',
                method: 'POST',
                body: orderData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['orders'],
        }),
    }),
})

export const { useMakeOrderMutation } = orderApi
