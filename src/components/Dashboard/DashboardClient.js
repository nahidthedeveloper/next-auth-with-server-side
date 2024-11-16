'use client'
import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddUserModal from './AddUserModal'
import StickyHeadTable from './StickyHeadTable'

export default function DashboardClient({
    users,
    permissionsList,
    login_user_permissions,
}) {
    const [openModal, setOpenModal] = useState(false)

    const handleAddUser = (newUser) => {
        console.log('New user added:', newUser)
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
                initialUsers={users}
                permissionsList={permissionsList}
            />
            <AddUserModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onAddUser={handleAddUser}
            />
        </Box>
    )
}
