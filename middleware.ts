import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/login', request.url);
  const homeUrl = new URL('/', request.url);
  const profileUrl = new URL('/profile', request.url); // Define profile URL
  const adminUrl = new URL('/admin', request.url);    // Define admin URL

  console.log(`Middleware: Pathname='${pathname}', Token exists='${!!token}', Role='${token?.role}'`);

  // --- Redirect logged-in users away from public-only pages ---
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
     console.log("Middleware: Logged-in user accessing login/signup, redirecting...");
     // Redirect based on role
     if (token.role === 'ADMIN') {
       return NextResponse.redirect(adminUrl);
     } else { // Assume USER or other roles go to profile
       return NextResponse.redirect(profileUrl);
     }
  }

  // --- Protect /admin routes (Admins only) ---
  if (pathname.startsWith('/admin')) {
    // If no token, redirect to login
    // If no token, redirect to login
    if (!token) {
      console.log("Middleware: No token for /admin, redirecting to login");
      loginUrl.searchParams.set('callbackUrl', pathname); // Add callback
      return NextResponse.redirect(loginUrl);
    }
    // If token exists but user is not ADMIN, redirect to homepage
    if (token.role !== 'ADMIN') {
      console.log("Middleware: Non-admin token for /admin, redirecting to home");
      return NextResponse.redirect(homeUrl);
    }
     console.log("Middleware: Allowing ADMIN access to /admin");
  }

  // --- Protect /profile route (Any logged-in user) ---
  if (pathname.startsWith('/profile')) {
     // If no token, redirect to login
    if (!token) {
       console.log("Middleware: No token for /profile, redirecting to login");
       loginUrl.searchParams.set('callbackUrl', pathname);
       return NextResponse.redirect(loginUrl);
    }
     console.log("Middleware: Allowing logged-in user access to /profile");
    // Any logged-in user (ADMIN or USER) can access /profile.
  }

  // --- Redirect logged-in users from homepage (Optional, keep if desired) ---
  // Note: This might conflict slightly if homepage IS the intended destination after some actions.
  // if (token && pathname === '/') {
  //   if (token.role === 'ADMIN') {
  //     return NextResponse.redirect(adminUrl);
  //   } else { 
  //     return NextResponse.redirect(profileUrl);
  //   }
  // }


  // Allow the request to proceed if none of the above conditions are met
  console.log("Middleware: Allowing request for", pathname);
  return NextResponse.next();
}


// Add matcher to specify which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (manifest file) // Added manifest.json
     * - robots.txt (robots file) // Added robots.txt
     * - sitemap.xml (sitemap file) // Added sitemap.xml
     * - static/ (static files in public/static)
     * - images/ (public images folder - might be redundant if using static/)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|static).*)',
  ],
}
