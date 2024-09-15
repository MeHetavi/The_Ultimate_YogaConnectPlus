import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    email: '',
    name: '',
    age: '',
    gender: '',
    is_trainer: '',
    trainees: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.name = action.payload.name
            state.age = action.payload.age
            state.gender = action.payload.gender
            state.is_trainer = action.payload.is_trainer
            state.trainees = action.payload.trainees
        },
        unsetUserInfo: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.name = action.payload.name
            state.age = action.payload.age
            state.gender = action.payload.gender
            state.is_trainer = action.payload.is_trainer
            state.trainees = action.payload.trainees
        },
    }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer