'use client'
import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddUserModal from './AddUserModal'
import StickyHeadTable from './StickyHeadTable'
import { httpClient } from '@/utils/api'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { TokenContext } from '@/context/tokenContext'

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
    const tokenStatus = useContext(TokenContext)

    async function fetchLoginUserPermission() {
        try {
            const res = await httpClient.get('/user/user_permissions/')
            setUserPermissions(res.data.user_permissions)
        } catch (err) {
            console.log('Error fetching permissions:', err.response || err)
        }
    }

    const fetchUser = async () => {
        try {
            const response = await httpClient.get('/user/')
            console.log('Fetch User Response:', response.data)
            return response.data
        } catch (err) {
            console.error('Error in fetchUser:', err)
            return null
        }
    }

    useEffect(() => {
        if (tokenStatus === 'added') {
            fetchLoginUserPermission()
        }
    }, [tokenStatus])

    const create_user_permission = userPermissions.find(
        (permission) => permission.name === 'todos.add_todos'
    )
    const edit_user_permission = userPermissions.find(
        (permission) => permission.name === 'todos.change_todos'
    )
    const delete_user_permission = userPermissions.find(
        (permission) => permission.name === 'todos.delete_todos'
    )
    const view_user_permission = userPermissions.find(
        (permission) => permission.name === 'todos.view_todos'
    )

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
                    <AddUserModal
                        open={openModal}
                        fetchUser={fetchUser}
                        setUsers={setUsers}
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
    )
}
