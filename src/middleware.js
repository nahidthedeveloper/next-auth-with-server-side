import { NextResponse } from 'next/server'

export function middleware(request) {
    const { cookies, nextUrl, url } = request
    const sessionToken = cookies.get('next-auth.session-token')?.value
    const currentPath = nextUrl.pathname

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
