import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { ADMIN_SESSION_COOKIE } from "./lib/admin/constants";
import { verifySessionToken } from "./lib/admin/session";

const intlMiddleware = createMiddleware(routing);

function isAdminPublicPath(pathname: string): boolean {
  return pathname === "/admin/login";
}

function isAdminProtectedPath(pathname: string): boolean {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

function pathnameStartsWithApi(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminProtectedPath(pathname) && !isAdminPublicPath(pathname)) {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const authenticated = await verifySessionToken(session);
    if (!authenticated) {
      if (pathnameStartsWithApi(pathname)) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(fr|es|en)/:path*",
    "/blog",
    "/blog/:path*",
    "/biens",
    "/biens/:path*",
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
