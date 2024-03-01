import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {

  const has_token = request.cookies.get("token");
 
  if (has_token === undefined || has_token === null) { 
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/"]
};