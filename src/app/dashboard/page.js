import StickyHeadTable from '@/components/Dashboard/StickyHeadTable'
import { createHttpServer } from '@/utils/api_server'
import { Box, Typography } from '@mui/material'

const httpServer = await createHttpServer()

export async function fetchUser() {
    try {
        const res = await httpServer.get('/user/')
        return {
            users: res.data,
        }
    } catch (err) {
        return {
            users: [],
        }
    }
}

async function fetchPermissionList() {
    try {
        const res = await httpServer.get('/user/authentication_permissions/')
        return {
            permissionsList: res.data.permissions,
        }
    } catch (err) {
        return {
            permissionsList: [],
        }
    }
}

async function fetchLoginUserPermission() {
    try {
        const res = await httpServer.get('/user/user_permissions/')
        return {
            login_user_permissions: res.data.user_permissions,
        }
    } catch (err) {
        return {
            login_user_permissions: [],
        }
    }
}

export default async function Dashboard() {
    const { users } = await fetchUser()
    const { permissionsList } = await fetchPermissionList()
    const { login_user_permissions } = await fetchLoginUserPermission()

    console.log(login_user_permissions);
    

    return (
        <Box>
            <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 'bold', textAlign: 'center', my: '16px' }}
            >
                All User Information
            </Typography>
            <StickyHeadTable users={users} permissionsList={permissionsList} />
        </Box>
    )
}
