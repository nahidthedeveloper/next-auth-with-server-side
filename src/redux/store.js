import permissionsSlice from '@/features/permissionsSlice'
import userPermissionsSlice from '@/features/userPrmissionsSlice'
import usersSlice from '@/features/usersSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        usersSlice,
        permissionsSlice,
        userPermissionsSlice,
    },
    devTools: true,
})

export default store
