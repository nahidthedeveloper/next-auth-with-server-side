import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
    },
    reducers: {
        fetchUsers: () => {
            // fetch user here
        },
    },
})

export const { fetchUsers } = counterSlice.actions

export default counterSlice.reducer
