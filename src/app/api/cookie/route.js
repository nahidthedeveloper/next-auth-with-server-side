import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createHttpServer } from '@/utils/api_server'

async function fetchUserPermissions(httpServer) {
    try {
        const res = await httpServer.get('/user/user_permissions/')
        console.log(res)
        return { user_permissions: res.data.user_permissions }
    } catch (err) {
        console.log(err)
        return { user_permissions: [] }
    }
}

export async function GET(request) {
    const httpServer = await createHttpServer()
    const { user_permissions } = await fetchUserPermissions(httpServer)

    const cookie = cookies()

    if (user_permissions.length > 0) {
        cookie.set('user_permissions', JSON.stringify(user_permissions), {
            path: '/', // Make cookie accessible to all routes
            // httpOnly: true, // Ensure it’s not accessible via JavaScript
            // secure: true, // Only sent over HTTPS
            // sameSite: 'strict', // Prevent CSRF attacks
        })
    } else {
        cookie.delete('user_permissions', { path: '/' })
    }

    return NextResponse.json({ message: 'It is a GET request' })
}
