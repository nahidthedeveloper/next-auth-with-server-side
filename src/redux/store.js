import usersSlice from '@/features/usersSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        usersSlice,
    },
})
