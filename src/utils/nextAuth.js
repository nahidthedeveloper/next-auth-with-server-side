import CredentialsProvider from 'next-auth/providers/credentials'

import { httpClient } from './api'
import { objectToArray } from './index'

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
                    const { data } = await httpClient.post(
                        `/auth/login/`,
                        payload
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
        async jwt({token, user}) {
            if (user) {
                token = {
                    ...token,
                    ...user,
                };
            }
            return token;
        },
        async session({session, token}) {
            session.user = {
                ...token,
                ...session.user,
            };
            return session;
        },
    },
    pages: {
        signIn: 'auth/login/',
        error: 'auth/login/',
    },
    secret: process.env.NEXTAUTH_SECRET,
}
