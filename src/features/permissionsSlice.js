import { createSlice } from '@reduxjs/toolkit'

export const permissionsSlice = createSlice({
    name: 'permissionsSlice',
    initialState: {
        permissions: [],
    },
    reducers: {
        updatePermissionsState: (state, action) => {
            state.permissions = action.payload
        },
    },
})

export const { updatePermissionsState } = permissionsSlice.actions

export default permissionsSlice.reducer
