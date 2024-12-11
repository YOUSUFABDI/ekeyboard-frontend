import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '../api'

const token = localStorage.getItem('token')

interface Image {
    id: number
    productId: number
    imageUrl: string
    public_id: string
}

interface Category {
    id: number
    name: string
}

interface Product {
    id: number
    name: string
    price: number
    description: string
    likes: number
    stock: number
    createdDT: string
    categoryId: number
    category: Category
    images: Image[]
}

interface TopSellingProduct {
    product: Product
    totalSold: number
}

interface TopSellingProductsResponse {
    payload: {
        message: string
        data: TopSellingProduct[]
    }
    error: any
}

// Use these types in your query
export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
    tagTypes: ['dashboardApi'],
    endpoints: (builder) => ({
        getTopSellingProducts: builder.query<TopSellingProductsResponse, number>({
            query: (limit = 10) => ({
                url: `/dashboard/top-selling?limit=${limit}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['dashboardApi'],
        }),
    }),
})

export const { useGetTopSellingProductsQuery } = dashboardApi
