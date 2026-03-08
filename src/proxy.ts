import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register", "/verify-otp"];
const B2B_PATHS = ["/admin", "/institution"];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isB2BPath(pathname: string) {
  return B2B_PATHS.some((p) => pathname.startsWith(p));
}

// Role-based guard: reads token from cookie/header and checks role
// Mock: we can't read localStorage in middleware; real impl would use httpOnly cookie
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, redirect to login if no auth cookie
  // auth_token is set by AuthContext on login
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/interview/:path*", "/exam/:path*", "/reports/:path*", "/profile/:path*", "/admin/:path*", "/institution/:path*"],
};
