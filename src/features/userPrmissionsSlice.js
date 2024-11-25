import { createSlice } from '@reduxjs/toolkit'

export const userPermissionsSlice = createSlice({
    name: 'userPermissions',
    initialState: {
        userPermissions: [],
    },
    reducers: {
        fetchUserPermissions: () => {
            // fetch userPermissions here
        },
    },
})

export const { fetchUserPermissions } = userPermissionsSlice.actions

export default userPermissionsSlice.reducer
