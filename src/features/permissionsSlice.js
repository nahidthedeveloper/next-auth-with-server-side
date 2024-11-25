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

export const { fetchPermissions } = permissionsSlice.actions

export default permissionsSlice.reducer
