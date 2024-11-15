import React from 'react'
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

const EditModal = ({
                       open,
                       user,
                       roles,
                       permissionsList,
                       userRole,
                       userPermissions,
                       handleClose,
                       handleInputChange,
                       handleRoleChange,
                       handlePermissionsChange,
                       handleSave,
                   }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{mb: 3}}>
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
                {/* Role Selection */}
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="role-select">Select Role</InputLabel>
                    <Select
                        id="role-select"
                        value={userRole}
                        onChange={handleRoleChange}
                        label="Select Role"
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Permissions Selection */}
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="permissions-select">Permissions</InputLabel>
                    <Select
                        id="permissions-select"
                        multiple
                        value={userPermissions}
                        onChange={handlePermissionsChange}
                        renderValue={(selected) => selected.join(', ')}
                        label="Permissions"
                    >
                        {permissionsList.map((permission) => (
                            <MenuItem key={permission} value={permission}>
                                {permission}
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
