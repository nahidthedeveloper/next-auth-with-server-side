import { authOptions } from '@/utils/nextAuth'
import { getServerSession } from 'next-auth'
import { Box, Typography, Paper, Avatar, Divider, Stack } from '@mui/material'
import { cookies } from 'next/headers'

export default async function Home() {
    const session = await getServerSession(authOptions)

    const cookieStore = cookies()
    const userPermissions = cookieStore.get('user_permissions')

    return (
        <div>
            <div>
                <h1>User Permissions</h1>
                <p>{userPermissions ? userPermissions.value : 'No permissions found'}</p>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 6,
                    px: 2,
                }}
            >
                {session && (
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            maxWidth: 450,
                            width: '100%',
                            borderRadius: 3,
                            textAlign: 'center',
                        }}
                    >
                        {/* User Avatar */}
                        <Box sx={{ mb: 3 }}>
                            <Avatar
                                alt={session.user.name}
                                src="#"
                                sx={{
                                    width: 80,
                                    height: 80,
                                    margin: '0 auto',
                                    border: '3px solid #1976d2',
                                }}
                            />
                        </Box>

                        {/* User Name */}
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                color: '#1976d2',
                                textTransform: 'capitalize',
                            }}
                        >
                            {session.user.name || 'User Name'}
                        </Typography>

                        {/* Divider */}
                        <Divider sx={{ my: 2 }} />

                        {/* User Details */}
                        <Stack spacing={2} sx={{ textAlign: 'left' }}>
                            <Typography variant="body1">
                                <strong>Email:</strong> {session.user.email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Role:</strong> {session.user.role || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                <strong>User ID:</strong> {session.user.id}
                            </Typography>
                        </Stack>
                    </Paper>
                )}
            </Box>
        </div>
    )
}
