import StickyHeadTable from '@/components/Dashboard/StickyHeadTable'
import { createHttpServer } from '@/utils/api_server'
import { Box, Typography } from '@mui/material'

export async function fetchUser() {
    const httpServer = await createHttpServer()
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

export default async function Dashboard() {
    const { users } = await fetchUser()

    return (
        <Box>
            <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 'bold', textAlign: 'center', my: '16px' }}
            >
                All User Information
            </Typography>
            <StickyHeadTable users={users} />
        </Box>
    )
}
