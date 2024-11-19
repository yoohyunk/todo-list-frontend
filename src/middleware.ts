// check if authenticated

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

function checkAuth(request: NextRequest) {
  const token = request.cookies.get("auth");
  return Boolean(token);
}

export function middleware(request: NextRequest) {
  const auth = checkAuth(request);
  console.log("auth", auth);
  if (!auth && new URL(request.url).pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (auth) {
    if (new URL(request.url).pathname === "/auth") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
