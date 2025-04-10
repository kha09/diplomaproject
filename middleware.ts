import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/login', request.url);
  const homeUrl = new URL('/', request.url);

  // --- Protect /admin routes (Admins only) ---
  if (pathname.startsWith('/admin')) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
    // If token exists but user is not ADMIN, redirect to homepage
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(homeUrl);
    }
  }

  // --- Protect /profile route (Any logged-in user) ---
  if (pathname.startsWith('/profile')) {
     // If no token, redirect to login
    if (!token) {
       // You might want to add a callbackUrl so the user is redirected back after login
       loginUrl.searchParams.set('callbackUrl', pathname);
       return NextResponse.redirect(loginUrl);
    }
    // Any logged-in user (ADMIN or USER) can access /profile, so no further role check needed here.
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}
