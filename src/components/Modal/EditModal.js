'use client'
import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

const roles = ['Admin', 'Manager', 'User']

const EditModal = ({
    permissionsList,
    open,
    user,
    userRole,
    userPermissions,
    setUserPermissions,
    handleClose,
    handleInputChange,
    handleRoleChange,
    handlePermissionsChange,
    handleSave,
}) => {

    useEffect(() => {
        if (user?.permissions) {
            setUserPermissions(user.permissions.map(permission => permission.id));
        }
    }, [user]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 3 }}>
                    Modify the details for this user.
                </DialogContentText>
                {/* Username Field */}
                <TextField
                    margin="dense"
                    label="Username"
                    name="username"
                    fullWidth
                    value={user?.username || ''}
                    onChange={handleInputChange}
                />
                {/* Email Field */}
                <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    fullWidth
                    value={user?.email || ''}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="role-select">Select Role</InputLabel>
                    <Select
                        id="role-select"
                        value={userRole}
                        onChange={handleRoleChange}
                        label="Select Role"
                    >
                        {roles.map((role) => (
                            <MenuItem
                                key={role}
                                value={role.toLowerCase()}
                                selected={userRole === role.toLowerCase()}
                            >
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Permissions Selection */}
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="permissions-select">
                        Permissions
                    </InputLabel>
                    <Select
                        id="permissions-select"
                        multiple
                        value={userPermissions}
                        onChange={handlePermissionsChange}
                        label="Permissions"
                    >
                        {permissionsList.map((permission) => (
                            <MenuItem key={permission.id} value={permission.id}>
                                {permission.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditModal
