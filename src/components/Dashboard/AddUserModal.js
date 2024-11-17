'use client'
import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    FormHelperText,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { signupSchema } from '@/components/validators'
import { httpClient } from '@/utils/api'
import { objectToArray } from '@/utils'

const roles = ['Admin', 'Manager', 'User']

export default function AddUserModal({ open, onClose, fetchUser, setUsers }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(signupSchema),
    })

    const submitForm = async (data) => {
        try {
            const response = await httpClient.post(`/user/`, data)

            toast.success(response.data.detail)
            reset()
            onClose()

            const updatedUsers = await fetchUser()

            setUsers(updatedUsers)

        } catch (err) {
            const { data } = err.response
            if (data) {
                const { data: errors } = err.response
                if (errors) {
                    if ('non_field_errors' in errors) {
                        toast.error(errors.non_field_errors[0])
                    }
                }

                const formattedData = objectToArray(data)
                formattedData.forEach((el) => {
                    setError(el.name, {
                        type: 'custom',
                        message: el.message[0],
                    })
                })
            }
        }
    }


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(submitForm)} noValidate>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <FormControl
                        fullWidth
                        margin="normal"
                        error={!!errors.role}
                    >
                        <InputLabel>Select Role</InputLabel>
                        <Select
                            {...register('role')}
                            defaultValue=""
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
                        <FormHelperText error>
                            {errors.role?.message}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        margin="normal"
                        {...register('confirm_password')}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}
                    />
                    <DialogActions sx={{ mt: 2 }}>
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <CircularProgress
                                    sx={{ color: 'white' }}
                                    size={20}
                                />
                            ) : (
                                'Add User'
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}
