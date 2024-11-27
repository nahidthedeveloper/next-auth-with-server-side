import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
    const { nextUrl } = request
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })
    const isAdmin = session?.role === 'admin'
    const currentPath = nextUrl.pathname

    if (!isAdmin && currentPath.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    if (session?.token && currentPath.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    if (!session?.token && !currentPath.startsWith('/auth')) {
        return NextResponse.redirect(
            new URL('/auth/login', request.nextUrl.origin)
        )
    }


//================================================================================
//       SET USER PERMISSIONS PART HERE
//================================================================================

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}user/user_permissions/`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.token}`,
            },
        }
    )
    const { user_permissions } = await res.json()

    const response = NextResponse.next()

    if (user_permissions) {
        response.cookies.set(
            'user_permissions',
            JSON.stringify(user_permissions),
            {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 60 * 60 * 24 * 7,
            }
        )
    } else {
        response.cookies.delete('user_permissions', { path: '/' })
    }

    return response
}

export const config = {
    matcher: ['/', '/auth/:path*', '/dashboard/:path*'],
}
