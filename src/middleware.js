import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
    const { nextUrl, cookies } = request
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })
    const isAdmin = session?.role === 'admin'
    const currentPath = nextUrl.pathname

    // Redirect logic for authenticated users trying to access auth paths
    if (session?.token && currentPath.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    // Redirect to login page if not authenticated and trying to access restricted paths
    if (!session?.token && !currentPath.startsWith('/auth')) {
        return NextResponse.redirect(
            new URL('/auth/login', request.nextUrl.origin)
        )
    }

    // Redirect if user is not admin and trying to access the dashboard
    if (!isAdmin && currentPath.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    // Redirect if user is not authenticated and trying to access todos
    if (!session?.token && currentPath.startsWith('/todos')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    const response = NextResponse.next()

    const isRefresh = cookies.get('isRefresh')?.value
    console.log(typeof(isRefresh));
    

    if (isRefresh === 'set' && session?.token) {
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

        if (user_permissions) {
            response.cookies.set(
                'user_permissions',
                JSON.stringify(user_permissions),
                {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 60 * 60 * 24 * 7, // 7 days
                }
            )
            cookies.set('isRefresh', 'remove', { path: '/' })
        } else {
            response.cookies.delete('user_permissions', { path: '/' })
        }

    }

    return response
}

export const config = {
    matcher: ['/', '/auth/:path*', '/dashboard/:path*', '/todos'],
}
