import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '../api'
import { ApiSuccessResponseDT, MakeOrderRequestDT, OrderDT, OrderHistoryDT } from '../../lib/types'

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
        getOrders: builder.query<ApiSuccessResponseDT<OrderDT[]>, void>({
            query: () => ({
                url: '/orders/get-orders',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['orders'],
        }),
        changeOrderStatus: builder.mutation<ApiSuccessResponseDT<any>, { id: number; status: string }>({
            query: ({ id, status }) => ({
                url: `/orders/change-status/${id}`,
                method: 'PATCH',
                body: { status },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['orders'],
        }),
        getOrderHistory: builder.query<ApiSuccessResponseDT<OrderHistoryDT[]>, void>({
            query: () => ({
                url: '/orders/order-history',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['orders'],
        }),
    }),
})

export const { useMakeOrderMutation, useGetOrdersQuery, useChangeOrderStatusMutation, useGetOrderHistoryQuery } = orderApi
