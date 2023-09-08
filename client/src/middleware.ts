import { NextRequest, NextResponse } from "next/server";

async function verifyToken(token: string | undefined) {

    const response = await fetch('http://localhost:3000/api/auth', { headers: { ['kanban-token']: token ?? '' } });

    const isValidToken = await response.json();
    return isValidToken;
}





export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('kanban-token')?.value;

    const isValidToken = await verifyToken(token);



    if (!isValidToken && pathname !== '/login' && pathname !== '/register') {
        console.log(isValidToken);
        request.nextUrl.pathname = '/login';
        return NextResponse.redirect(request.nextUrl);
    }

    if (isValidToken && (pathname === '/login' || pathname === '/register')) {
        request.nextUrl.pathname = '/';
        return NextResponse.redirect(request.nextUrl);
    }


    return NextResponse.next();
}


export const config = {
    matcher: ['/', '/boards/:boardId*', '/settings', '/login']
}