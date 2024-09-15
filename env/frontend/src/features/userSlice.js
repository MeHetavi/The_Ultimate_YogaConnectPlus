import { createSlice } from '@reduxjs/toolkit'

// Configuration
const API_BASE_URL = 'http://localhost:8000';  // Adjust this to match your backend URL

// Helper function to construct the full avatar path
const getFullAvatarPath = (avatarPath) => {
    if (!avatarPath) return null;
    // Remove any leading slash from avatarPath
    const cleanPath = avatarPath.replace(/^\//, '');
    return `${API_BASE_URL}/${cleanPath}`;
};

const initialState = {
    username: '',
    email: '',
    name: '',
    age: '',
    gender: '',
    is_trainer: '',
    trainees: [],
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
            state.avatar = null
        },
    }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer