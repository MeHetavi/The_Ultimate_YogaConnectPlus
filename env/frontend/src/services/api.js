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
            query: ({ access_token, profile_username }) => {
                return {
                    url: 'becomeTrainee/',
                    method: 'POST',
                    body: { profile_username },
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
        getProductsByCategory: builder.query({
            query: () => {
                return {
                    url: 'products/',
                    method: 'GET',
                }
            },
        }),
        changePassword: builder.mutation({
            query: ({ access_token, data }) => {
                return {
                    url: 'changePassword/',
                    method: 'PUT',
                    body: data,
                    headers: {
                        'authorization': `Bearer ${access_token}`,
                    }
                }
            },
        }),

        // New endpoints for cart and wishlist
        getCart: builder.query({
            query: ({ access_token }) => ({
                url: 'cart/',
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                },
            }),
        }),

        addToCart: builder.mutation({
            query: ({ access_token, product_id }) => ({
                url: 'cart/',
                method: 'POST',
                body: { product_id },
                headers: {
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                },
            }),
        }),

        removeFromCart: builder.mutation({
            query: ({ access_token, product_id }) => ({
                url: 'cart/',
                method: 'DELETE',
                body: { product_id },
                headers: {
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                },
            }),
        }),

        getWishlist: builder.query({
            query: ({ access_token }) => ({
                url: 'wishlist/',
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                },
            }),
        }),

        addToWishlist: builder.mutation({
            query: ({ access_token, product_id }) => ({
                url: 'wishlist/',
                method: 'POST',
                body: { product_id },
                headers: {
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                },
            }),
        }),

        removeFromWishlist: builder.mutation({
            query: ({ access_token, product_id }) => ({
                url: 'wishlist/',
                method: 'DELETE',
                body: { product_id },
                headers: {
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                },
            }),
        }),
        saveVideoCallURL: builder.mutation({
            query: ({ access_token, url }) => ({
                url: 'videoCallURL/',
                method: 'POST',
                body: { url },
                headers: {
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                },
            }),
        }),
        unsaveVideoCallURL: builder.mutation({
            query: ({ access_token }) => ({
                url: 'videoCallURL/',
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                },
            }),
        }),


    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetLoggedUserQuery,
    useGetUsersQuery,
    useBecomeTraineeMutation,
    useUpdateProfileMutation,
    useGetProductsByCategoryQuery,
    useChangePasswordMutation,
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useSaveVideoCallURLMutation,
    useUnsaveVideoCallURLMutation,
} = api