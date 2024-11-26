import permissionsSlice from '@/features/permissionsSlice'
import { todosSlice } from '@/features/todosSlice'
import userPermissionsSlice from '@/features/userPrmissionsSlice'
import usersSlice from '@/features/usersSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        usersSlice,
        permissionsSlice,
        userPermissionsSlice,
        todosSlice,
    },
    devTools: true,
})

export default store
