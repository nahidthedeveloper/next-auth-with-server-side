'use client'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '@/components/Copyright'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signupSchema } from '@/components/validators'
import { toast } from 'react-toastify'
import { objectToArray } from '@/utils'
import { CircularProgress } from '@mui/material'
import { httpClient } from '@/utils/api'
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const router = useRouter()

    const [agree, setAgree] = useState(false)
    const [loader, setLoader] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(signupSchema),
    })

    const submitForm = (data) => {
        setLoader(true)
        const payload = {
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            role: 'user',
        }
        console.log(data)

        httpClient
            .post(`/auth/signup/`, payload)
            .then((response) => {
                toast.success(response.data.message)
                setLoader(false)
                reset()
                router.push('/auth/login/')
            })
            .catch((err) => {
                const { data } = err.response
                if (data) {
                    const { data: errors } = err.response
                    if (errors) {
                        if ('non_field_errors' in errors) {
                            toast.error(errors.non_field_errors[0])
                        }
                    }
                    const formattedData = objectToArray(data)
                    formattedData.map((el) => {
                        setError(el.name, {
                            type: 'custom',
                            message: el.message[0],
                        })
                    })
                }
                setLoader(false)
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(submitForm)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="username"
                                label="Username"
                                autoComplete="username"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                {...register('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                id="cpassword"
                                autoComplete="new-password"
                                error={!!errors.password}
                                helperText={errors.confirm_password?.message}
                                {...register('confirm_password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                        onChange={() => setAgree(!agree)}
                                    />
                                }
                                label="Agree to Terms and Conditions"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!agree || loader}
                    >
                        {loader ? (
                            <CircularProgress
                                sx={{ color: 'green' }}
                                size={30}
                            />
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                    <Grid
                        container
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Grid item>
                            <Link href={'/auth/login'}>
                                <Typography variant="body2">
                                    Already have an account? Sign in
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}
