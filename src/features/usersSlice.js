import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        users: [],
    },
    reducers: {
        updateUsersState: (state, action) => {
            state.users = action.payload
        },
    },
})

export const { updateUsersState } = usersSlice.actions

export default usersSlice.reducer
