import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDT } from '../../lib/types'

interface AuthState {
    user: UserDT | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserDT | null>) {
            state.user = action.payload
        },
    },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
