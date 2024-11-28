import CredentialsProvider from 'next-auth/providers/credentials'
import { objectToArray } from './index'
import { httpClient } from './api'
import fetchUserPermissions from '@/utils/fetchUserPermissions'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize({ username_or_email, password }) {
                const payload = {
                    username_or_email,
                    password,
                }
                try {
                    const { data } = await httpClient.post(`/auth/login/`, payload)

                    const userPermissions = await fetchUserPermissions(data.token)
                    cookies().set(
                        'user_permissions',
                        JSON.stringify(userPermissions.user_permissions || []),
                        {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            path: '/',
                        },
                    )
                    return data
                } catch (error) {
                    if ('response' in error) {
                        const { data: errors } = error.response
                        const formattedData = objectToArray(errors)
                        throw new Error(JSON.stringify(formattedData))
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    ...user,
                }
            }
            return token
        },
        async session({ session, token }) {
            // Pass token data (including permissions) to session
            session.user = {
                ...token,
                ...session.user,
            }
            return session
        },
    },
    pages: {
        signIn: 'auth/login/',
        error: 'auth/login/',
    },
    secret: process.env.NEXTAUTH_SECRET,
}
