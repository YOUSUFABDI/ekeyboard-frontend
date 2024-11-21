import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductDT } from '../../lib/types'

interface CartState {
    items: ProductDT[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductDT>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1 // Increment quantity if the item exists
            } else {
                state.items.push({ ...action.payload, quantity: 1 }) // Add new item with quantity = 1
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        clearCart: (state) => {
            state.items = []
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((item) => item.id === action.payload)
            if (item) {
                item.quantity += 1
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((item) => item.id === action.payload)
            if (item && item.quantity > 1) {
                item.quantity -= 1
            }
        },
    },
})

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer
