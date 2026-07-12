import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (!req.nextUrl.pathname.startsWith("/login"))
      return NextResponse.redirect(new URL("/login", req.url));
  } else {
    if (req.nextUrl.pathname.startsWith("/login"))
      return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/login", "/newEntry"],
};
