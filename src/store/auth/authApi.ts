import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiSuccessResponseDT, AuthResponse, GetAuthenticatedUserResponseDT, UserDT } from '../../lib/types'
import { API } from '../api'
import { url } from 'inspector'

const token = localStorage.getItem('token')

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, {}>({
            query: (body) => {
                return {
                    url: '/auth',
                    method: 'POST',
                    body,
                    contentType: 'application/json',
                }
            },
            invalidatesTags: ['auth'],
        }),

        signup: builder.mutation<AuthResponse, { formData: any }>({
            query: ({ formData }) => {
                return {
                    url: '/auth/signup',
                    method: 'POST',
                    body: formData,
                    contentType: 'application/json',
                }
            },
            invalidatesTags: ['auth'],
        }),

        getAuthenticatedUser: builder.query<GetAuthenticatedUserResponseDT, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['auth'],
        }),

        updatePassword: builder.mutation<AuthResponse, {}>({
            query: (body) => {
                return {
                    url: 'auth/update-password',
                    method: 'PUT',
                    body,
                    contentType: 'application/json',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['auth'],
        }),

        updateAdminInfo: builder.mutation<AuthResponse, {}>({
            query: (body) => {
                return {
                    url: 'auth/update-admin-info',
                    method: 'PUT',
                    body,
                    contentType: 'application/json',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['auth'],
        }),

        changeProfileImg: builder.mutation<ApiSuccessResponseDT<UserDT>, { profileImg: string }>({
            query: ({ profileImg }) => ({
                url: '/auth/change-profile-img',
                method: 'PUT',
                body: { profileImg },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['auth'],
        }),
    }),
})

export const { useLoginMutation, useSignupMutation, useGetAuthenticatedUserQuery, useUpdatePasswordMutation, useUpdateAdminInfoMutation, useChangeProfileImgMutation } = authApi
