import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),

    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'signUp/',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),

        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'signIn/',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),

        getLoggedUser: builder.query({
            query: ({ access_token }) => {
                return {
                    url: 'dashboard/',
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${access_token}`,
                    }
                }
            }
        }),
        getUsers: builder.query({
            query: () => {
                return {
                    url: 'allUsers/',
                    method: 'GET',
                }
            },
        }),
        becomeTrainee: builder.mutation({
            query: ({ access_token, user, profile }) => {
                return {
                    url: 'becomeTrainee/',
                    method: 'POST',
                    body: { user, profile },
                    headers: {
                        'authorization': `Bearer ${access_token}`,
                    }
                }
            },
        }),
        updateProfile: builder.mutation({
            query: ({ access_token, data }) => {
                return {
                    url: 'updateProfile/',
                    method: 'PUT',
                    body: data,
                    headers: {
                        'authorization': `Bearer ${access_token}`,
                    }
                }
            },
        }),



    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetLoggedUserQuery,
    useGetUsersQuery,
    useBecomeTraineeMutation,
    useUpdateProfileMutation
} = api