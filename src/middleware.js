import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
    const { cookies, nextUrl, url } = request
    const sessionToken = cookies.get('next-auth.session-token')?.value
    const currentPath = nextUrl.pathname

    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const isAdmin = session?.role === 'admin'

    if (!isAdmin && currentPath.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', url))
    }

    if (sessionToken && currentPath.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', url))
    }

    if (!sessionToken && !currentPath.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/login', url))
    }
}

export const config = {
    matcher: ['/', '/auth/:path*', '/dashboard'],
}
