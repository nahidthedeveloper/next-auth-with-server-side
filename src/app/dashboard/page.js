import DashboardClient from '@/components/Dashboard/DashboardClient'
import { createHttpServer } from '@/utils/api_server'
import { Box } from '@mui/material'

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

async function fetchLoginUserPermission() {
    try {
        const res = await httpServer.get('/user/user_permissions/')
        return { login_user_permissions: res.data.user_permissions }
    } catch (err) {
        console.log(err)
    }
}

export default async function Dashboard() {
    const { users } = await fetchUser()
    const { permissionsList } = await fetchPermissionList()
    const { login_user_permissions } = await fetchLoginUserPermission()

    return (
        <Box>
            <DashboardClient
                all_users={users}
                permissionsList={permissionsList}
                login_user_permissions={login_user_permissions}
            />
        </Box>
    )
}
