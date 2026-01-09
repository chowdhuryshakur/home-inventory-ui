import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ['/inventory', '/items', 'locations']
const authRoutes = ['/login']

export const middleware = (request: NextRequest) => {
    if (request.nextUrl.pathname === '/login') console.log('req', request.cookies.get('auth_token')?.value, request.headers)
    const { pathname } = request.nextUrl
    const token = request.cookies.get('auth_token')?.value

    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    if (isAuthRoute && token) {
        const inventoryUrl = new URL('/inventory', request.url)
        return NextResponse.redirect(inventoryUrl)
    }

    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};