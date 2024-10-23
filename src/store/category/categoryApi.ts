import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { CategoryApiResponseDT } from '../../lib/types'
import { API } from '../api'

const token = localStorage.getItem('token')

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
    tagTypes: ['categoryApi'],
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryApiResponseDT, void>({
            query: () => ({
                url: '/category',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
})

export const { useGetCategoriesQuery } = categoryApi
