import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('kanban-token');


    if (!token) {
        request.nextUrl.pathname = '/login';
        return NextResponse.redirect(request.nextUrl);
    }


    NextResponse.next();
}


export const config = {
    matcher: ['/', '/boards/:boardId', '/settings']
}