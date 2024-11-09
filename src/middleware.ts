// check if authenticated

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

function checkAuth(request: NextRequest) {
  const token = request.cookies.get("auth");
  console.log("token", token);
  return Boolean(token);
}

export function middleware(request: NextRequest) {
  const auth = checkAuth(request);
  if (!auth) {
    console.log("redirecting to /auth");
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  //   if (request.nextUrl.pathname === "/auth") {
  //     return NextResponse.next();
  //   }
  if (auth) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)",
  ],
};
