import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './action';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/register';

  const token = request.cookies.get('session')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  // validate cookie and update expiry on route change
  return await updateSession(request);
}

export const config = {
  matcher: ['/profile', '/players', '/friends', '/login', '/register', '/chat']
};
