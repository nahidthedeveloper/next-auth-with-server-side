import { authOptions } from '@/utils/nextAuth'
import { getServerSession } from 'next-auth'
import DrawerButton from '@/components/DrawerButton'
import { Box, Typography, Paper } from '@mui/material';

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            {/* <DrawerButton /> */}
            {session && (
                <Paper elevation={3} sx={{ p: 4, maxWidth: 400 }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                    >
                        Your Information
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        <strong>Name:</strong> {session.user.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Email:</strong> {session.user.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Role:</strong> {session.user.role}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>User ID:</strong> {session.user.id}
                    </Typography>
                </Paper>
            )}
        </Box>
    )
}
