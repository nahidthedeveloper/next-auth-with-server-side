import StickyHeadTable from '@/components/Dashboard/StickyHeadTable'
import { createHttpClient, httpClient } from '@/utils/api'
import { Box, Typography } from '@mui/material'

export async function fetchUser() {
    const httpClient = await createHttpClient()
    try {
        const res = await httpClient.get('/user/')
        return {
            data: res.data,
        }
    } catch (err) {
        return {
            data: [],
        }
    }
}

export default async function Dashboard() {
    const { data } = await fetchUser()
    const users = data
    console.log(users);
    

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
