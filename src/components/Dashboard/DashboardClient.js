'use client'
import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddUserModal from './AddUserModal'
import StickyHeadTable from './StickyHeadTable'
import { httpClient } from '@/utils/api'

export default function DashboardClient({
                                            all_users,
                                            permissionsList,
                                            login_user_permissions,
                                        }) {

    const [openModal, setOpenModal] = useState(false)
    const [users, setUsers] = useState(all_users)

    async function fetchUser() {
        try {
            const res = await httpClient.get('/user/')
            return {
                users: res.data,
            }
        } catch (err) {
            console.log(err)
            return {
                users: [],
            }
        }
    }


    return (
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
                <Button
                    startIcon={<PersonAddIcon />}
                    variant="outlined"
                    size="small"
                    onClick={() => setOpenModal(true)}
                >
                    Add User
                </Button>
            </Box>

            <StickyHeadTable
                users={users}
                setUsers={setUsers}
                fetchUser={fetchUser}
                permissionsList={permissionsList}
            />
            <AddUserModal
                open={openModal}
                fetchUser={fetchUser}
                onClose={() => setOpenModal(false)}
            />
        </Box>
    )
}
