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

    if (session?.token && currentPath.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    if (!session?.token && !currentPath.startsWith('/auth')) {
        return NextResponse.redirect(
            new URL('/auth/login', request.nextUrl.origin),
        )
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
