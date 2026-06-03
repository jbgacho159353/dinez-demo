import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root and /login to default locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/en/login", request.url));
  }

  // Allow public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/dashboard/login" ||
    pathname === "/driver/login" ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  // Check auth for dashboard routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/driver")) {
    const token =
      request.cookies.get("sb-mbkintgnfypooicbcpmo-auth-token") ||
      request.cookies.get("sb-access-token");

    if (!token) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
