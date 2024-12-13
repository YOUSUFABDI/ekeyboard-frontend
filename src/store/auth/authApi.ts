import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiSuccessResponseDT, AuthResponse, GetAuthenticatedUserResponseDT, UserDT } from '../../lib/types'
import { API } from '../api'

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

        signup: builder.mutation<AuthResponse, {}>({
            query: (body) => {
                return {
                    url: '/auth/signup',
                    method: 'POST',
                    body: body,
                    contentType: 'application/json',
                }
            },
            invalidatesTags: ['auth'],
        }),

        verifyOtp: builder.mutation<AuthResponse, { email: string; otp: number }>({
            query: (body) => ({
                url: '/auth/verfiy-otp',
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['auth'],
        }),

        forgotPassword: builder.mutation<void, { email: string }>({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['auth'],
        }),

        resetPassword: builder.mutation<void, { otp: number; newPassword: string }>({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body,
            }),
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

export const {
    useLoginMutation,
    useSignupMutation,
    useVerifyOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetAuthenticatedUserQuery,
    useUpdatePasswordMutation,
    useUpdateAdminInfoMutation,
    useChangeProfileImgMutation,
} = authApi
