import { createSlice } from '@reduxjs/toolkit'

export const userPermissionsSlice = createSlice({
    name: 'userPermissionsSlice',
    initialState: {
        userPermissions: null,
    },
    reducers: {
        updateUserPermissionsState: (state, action) => {
            state.userPermissions = action.payload
        },
    },
})

export const { updateUserPermissionsState } = userPermissionsSlice.actions

export default userPermissionsSlice.reducer
