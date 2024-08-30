import { createSlice } from '@reduxjs/toolkit'

export const allUsersSlice = createSlice({
    name: 'user',
    initialState: {
        'users': []
    },
    reducers: {
        setAllUsersSlice: (state, action) => {
            state.users = action.payload.users
        },
        unsetAllUsersSlice: (state, action) => {
            state.users = action.payload.users
        },
    }
})

export const { setAllUsersSlice, unsetAllUsersSlice } = allUsersSlice.actions

export default allUsersSlice.reducer