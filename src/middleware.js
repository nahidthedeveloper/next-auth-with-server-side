import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import fetchUserPermissions from '@/utils/fetchUserPermissions'

export async function middleware(request) {
    const { nextUrl } = request
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })
    const isAdmin = session?.role === 'admin'
    const currentPath = nextUrl.pathname

    const cacheControl = request.headers.get('Cache-Control')

    if (cacheControl) {
        const response = NextResponse.next()
        if (session?.token) {
            const userPer = await fetchUserPermissions(session?.token)
            response.cookies.set(
                'user_permissions',
                JSON.stringify(userPer?.user_permissions || []),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                },
            )
        }
        return response
    }

    if (session?.token && currentPath.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    if (!session?.token && !currentPath.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin))
    }

    if (!isAdmin && currentPath.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    if (!session?.token && currentPath.startsWith('/todos')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/auth/:path*', '/dashboard/:path*', '/todos'],
}
