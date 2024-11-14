import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuth'

export const createHttpClient = async () => {
    const session = await getServerSession(authOptions)

    const httpClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
        headers: {
            'Content-Type': 'application/json',
            ...(session &&
                session.user.token && {
                    Authorization: `Bearer ${session.user.token}`,
                }),
        },
    })

    if (session) {
        console.log('Session token added:', session.user.token)
    } else {
        console.log('No session token available')
    }

    return httpClient
}

// Usage
// const httpClient = await createHttpClient()
