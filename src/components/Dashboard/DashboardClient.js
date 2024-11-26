'use client'
import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddUserModal from './AddUserModal'
import StickyHeadTable from './StickyHeadTable'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsersState } from '@/features/usersSlice'
import { updatePermissionsState } from '@/features/permissionsSlice'
import { updateUserPermissionsState } from '@/features/userPrmissionsSlice'

export default function DashboardClient({
                                            all_users,
                                            permissionsList,
                                            user_permissions,
                                        }) {
    const [openModal, setOpenModal] = useState(false)

    const userPermissions = useSelector(state => state.userPermissionsSlice.userPermissions)


    const dispatch = useDispatch()
    useEffect(() => {
        if (all_users) {
            dispatch(updateUsersState(all_users))
            dispatch(updatePermissionsState(permissionsList))
            dispatch(updateUserPermissionsState(user_permissions))
        }
    }, [all_users, permissionsList, user_permissions, dispatch])


    const create_user_permission = userPermissions?.find(
        (permission) => permission.name === 'todos.add_todos',
    )
    const edit_user_permission = userPermissions?.find(
        (permission) => permission.name === 'todos.change_todos',
    )
    const delete_user_permission = userPermissions?.find(
        (permission) => permission.name === 'todos.delete_todos',
    )
    const view_user_permission = userPermissions?.find(
        (permission) => permission.name === 'todos.view_todos',
    )

    return (
        <Box>
            {userPermissions ? (
                <Box>
                    {view_user_permission ? (
                        <Box>
                            <Box
                                sx={{
                                    my: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    All User Information
                                </Typography>
                                {create_user_permission && (
                                    <Button
                                        startIcon={<PersonAddIcon />}
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setOpenModal(true)}
                                    >
                                        Add User
                                    </Button>
                                )}
                            </Box>
                            <StickyHeadTable
                                edit_user_permission={edit_user_permission}
                                delete_user_permission={delete_user_permission}
                            />
                            <AddUserModal
                                open={openModal}
                                onClose={() => setOpenModal(false)}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                mt: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ fontWeight: 'bold' }}
                            >
                                You do not have permission to view this page.
                            </Typography>
                            <Link href="/">
                                <Button
                                    sx={{ my: 2 }}
                                    variant="contained"
                                    startIcon={<ArrowBackIcon />}
                                >
                                    Back to Home
                                </Button>
                            </Link>
                        </Box>
                    )}
                </Box>
            ) : (
                <Box
                    sx={{
                        mt: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Typography
                        variant="body1"
                        gutterBottom
                    >
                        Loading...
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
