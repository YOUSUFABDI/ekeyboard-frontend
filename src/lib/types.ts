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

type ImageDT = {
    id: string
    productId: string
    imageUrl: string
}

export type ProductDT = {
    id: string
    name: string
    price: number
    description: string
    likes: number
    stock: number
    createdDT: string
    categoryId: number
    images: ImageDT[]
}

export type CategoryDT = {
    id: number
    name: string
}

export type CategoryApiResponseDT = {
    statusCode: number
    payload: {
        data: CategoryDT[]
        message: string
    }
    error: null
}

export type CreateProductRequestDT = {
    productName: string
    productPrice: number
    productDescription: string
    productImage: string[]
    productStock: number
    categoryId: number
}

export type UpdateProductRequestDT = {
    productName: string
    productPrice: number
    productDescription: string
    productImage: string[]
    productStock: number
    categoryId: number
}
