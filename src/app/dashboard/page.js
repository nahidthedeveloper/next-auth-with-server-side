import DashboardClient from '@/components/Dashboard/DashboardClient'
import { createHttpServer } from '@/utils/api_server'
import { Box } from '@mui/material'
import { cookies } from 'next/headers'

const httpServer = await createHttpServer()

export async function fetchUser() {
    try {
        const res = await httpServer.get('/user/')
        return { users: res.data }
    } catch (err) {
        return { users: [] }
    }
}

async function fetchPermissionList() {
    try {
        const res = await httpServer.get('/user/permissions/')
        return { permissionsList: res.data.permissions }
    } catch (err) {
        return { permissionsList: [] }
    }
}

export default async function Dashboard() {
    const cookieStore = cookies()
    const userPermissions = await cookieStore.get('user_permissions')
    const { users } = await fetchUser()
    const { permissionsList } = await fetchPermissionList()


    return (
        <Box>
            <DashboardClient
                all_users={users}
                permissionsList={permissionsList}
                user_permissions={JSON.parse(userPermissions.value)}
            />
        </Box>
    )
}
