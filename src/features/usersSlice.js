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

export const { fetchUsers } = usersSlice.actions

export default usersSlice.reducer
