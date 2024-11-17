'use client'
import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddUserModal from './AddUserModal'
import StickyHeadTable from './StickyHeadTable'
import { httpClient } from '@/utils/api'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function DashboardClient({
    all_users,
    permissionsList,
    login_user_permissions,
}) {
    const [openModal, setOpenModal] = useState(false)
    const [users, setUsers] = useState(all_users)
    const [userPermissions, setUserPermissions] = useState(
        login_user_permissions
    )

    useEffect(() => {
        fetchLoginUserPermission()
    }, [login_user_permissions])


    async function fetchUser() {
        try {
            const res = await httpClient.get('/user/')
            setUsers(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const create_user_permission = userPermissions.find(
        (permission) => parseInt(permission.id) === 49
    )
    const edit_user_permission = userPermissions.find(
        (permission) => parseInt(permission.id) === 50
    )
    const delete_user_permission = userPermissions.find(
        (permission) => parseInt(permission.id) === 51
    )
    const view_user_permission = userPermissions.find(
        (permission) => parseInt(permission.id) === 52
    )

    async function fetchLoginUserPermission() {
        try {
            const res = await httpClient.get('/user/login_user_permissions/')
            setUserPermissions(res.data.user_permissions)
        } catch (err) {
            console.log(err)
        }
    }

    return (
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
                        users={users}
                        setUsers={setUsers}
                        fetchUser={fetchUser}
                        permissionsList={permissionsList}
                        fetchLoginUserPermission={fetchLoginUserPermission}
                        edit_user_permission={edit_user_permission}
                        delete_user_permission={delete_user_permission}
                    />
                    {create_user_permission && (
                        <AddUserModal
                            open={openModal}
                            fetchUser={fetchUser}
                            onClose={() => setOpenModal(false)}
                        />
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
    )
}
