import React, { useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material'

const roles = ['Admin', 'Manager', 'User']

export default function AddUserModal({ open, onClose, onAddUser }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState({
        passwordMismatch: false,
    })

    const handleAddUser = () => {
        if (password !== confirmPassword) {
            setError({ passwordMismatch: true })
            return
        }

        setError({ passwordMismatch: false })

        const newUser = {
            username,
            email,
            role,
            password,
        }

        onAddUser(newUser)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="role-select">Select Role</InputLabel>
                    <Select
                        id="role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        label="Select Role"
                    >
                        {roles.map((roleOption) => (
                            <MenuItem
                                key={roleOption}
                                value={roleOption.toLowerCase()}
                            >
                                {roleOption}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={error.passwordMismatch}
                    helperText={
                        error.passwordMismatch ? 'Passwords do not match' : ''
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddUser} color="primary">
                    Add User
                </Button>
            </DialogActions>
        </Dialog>
    )
}
