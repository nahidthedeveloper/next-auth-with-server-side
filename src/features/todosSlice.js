import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
    name: 'todosSlice',
    initialState: {
        todos: [],
    },
    reducers: {
        updateTodosState: (state, action) => {
            state.todos = action.payload
        },
    },
})

export const { updateTodosState } = todosSlice.actions

export default todosSlice.reducer
