'use client'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

export const SessionProvider = ({ children }) => {
    return <NextAuthProvider>{children}</NextAuthProvider>
}
