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

export type AuthResponse = ApiResponseDT<{ message: string; data: { token: string; role: string; user?: UserDT } }>

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
    quantity: number
    isLiked: boolean
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

export type MakeOrderRequestDT = {
    productID: string
    quantity: number
}

export type OrderDT = {
    id: number
    userId: number
    productId: number
    quantity: number
    status: string
    createdDT: string
    user: {
        id: number
        fullName: string
        email: string
        phone: string
    }
    product: {
        id: number
        name: string
        price: number
    }
}

export interface RecentOrder {
    orderId: number
    customerName: string
    productName: string
    orderPrice: number
    orderStatus: string
    orderDate: string
}

export interface RecentOrdersResponse {
    statusCode: number // The status code from the response
    payload: {
        message: string // The message in the response
        data: RecentOrder[] // The array of recent orders
    }
    error: null | string // If there are errors
}

export type OrderHistoryDT = {
    orderId: number
    productName: string
    quantity: number
    price: number
    status: string
    createdDate: string
}
