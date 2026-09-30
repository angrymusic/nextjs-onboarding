import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.cookies.get("session")?.value) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "from",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/items/:path*"],
};
