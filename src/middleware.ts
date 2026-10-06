import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Read session cookie sent by Express backend (session-based authentication in Redis)
  const sessionCookie =
    request.cookies.get("connect.sid") || request.cookies.get("sessionId");
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-email");
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/links");

  // If unauthenticated user tries to enter protected area
  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated user tries to open login/register
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/links/:path*",
    "/login",
    "/register",
    "/verify-email",
  ],
};
