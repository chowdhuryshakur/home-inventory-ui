import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers';

const protectedRoutes = ['/inventory', '/items', 'locations']
const authRoutes = ['/login']

export const middleware = async (request: NextRequest) => {
    //for testing purpose
    // (await cookies()).set('auth_token', 'OHUTOOWYIXT3JYAHDSXNPVMP44', { httpOnly: true, path: '/' })
    
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