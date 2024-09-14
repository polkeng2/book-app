import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const res = NextResponse;
  res.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  /* if (!req.nextUrl.pathname.startsWith("/login"))
    return NextResponse.redirect(new URL("/login", req.url)); */

  //NO TOKEN
  if (!token) {
    if (!req.nextUrl.pathname.startsWith("/login"))
      return res.redirect(new URL("/login", req.url));
  } else {
    //SI TOKEN
    if (req.nextUrl.pathname.startsWith("/login"))
      return res.redirect(new URL("/", req.url));
  }

  return res.next();
};

export const config = {
  matcher: ["/", "/login", "/newEntry", "/logout"],
};
