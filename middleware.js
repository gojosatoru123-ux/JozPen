// middleware.ts

import { NextResponse } from "next/server";
import { auth } from "./auth";

// Define routes that don't require auth
const protectedPatterns = [
    /^\/$/,                          // root
    /^\/blog\/create$/,              // blog creation
    /^\/bookmark$/,                  // bookmarks
    /^\/profile\/[^\/]+$/,           // dynamic profile pages
    /^\/blog\/[^\/]+$/,              // dynamic blog pages like /blog/123
];
const publicRoutes = ['/about', '/termsandconditions', '/privacypolicy'];

export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(pathname)
  const isProtectedRoute = protectedPatterns.some((pattern) => pattern.test(pathname));
  const isPublicRoute = publicRoutes.includes(pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const session = await auth();
  if(!session && isProtectedRoute) {
    // Redirect to login if not authenticated and trying to access a protected route
    return NextResponse.redirect(new URL('/about', request.url));
  }


  return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"],
  };