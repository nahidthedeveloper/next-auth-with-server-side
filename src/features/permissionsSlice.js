import { createSlice } from '@reduxjs/toolkit'

export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState: {
        permissions: [],
    },
    reducers: {
        fetchPermissions: () => {
            // fetch permissions here
        },
    },
})

export const { fetchPermissions } = counterSlice.actions

export default counterSlice.reducer
