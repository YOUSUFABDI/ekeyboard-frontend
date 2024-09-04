export interface ApiResponseDT<T> {
    statusCode: number
    payload: T | null
    error: {
        statusCode: number
        message: string
    } | null
}

export type ApiSuccessResponseDT<T> = {
    statusCode: number
    payload: {
        message: string
        data: T
    }
    error: null
}

export type ApiErrorResponseDT = {
    statusCode: number
    payload: null
    error: {
        statusCode: number
        message: string
    }
}

export interface UserDT {
    role: string
    id: number
    username: string
    age: number
    email: string
    phone: string
    address: string
    fullName: string
    photo: string
    createdDT: string
}

export type AuthResponse = ApiResponseDT<{ data: { token: string; role: string } }>

export type GetAuthenticatedUserResponseDT = ApiResponseDT<{ user: UserDT | null }>

export type UpdatePassDT = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}
