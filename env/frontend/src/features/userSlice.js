import { createSlice } from '@reduxjs/toolkit'
import { getFullAvatarPath } from '../services/localStorage'

const initialState = {
    username: '',
    email: '',
    name: '',
    age: '',
    gender: '',
    is_trainer: '',
    trainees: [],
    trainers: [],  // New field
    avatar: null,
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
            state.trainers = action.payload.trainers
            state.avatar = getFullAvatarPath(action.payload.avatar)
        },
        unsetUserInfo: (state) => {
            state.username = ''
            state.email = ''
            state.name = ''
            state.age = ''
            state.gender = ''
            state.is_trainer = ''
            state.trainees = []
            state.trainers = []
            state.avatar = null
        },
    }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer