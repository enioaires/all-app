import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = await getToken({ req });
    const isLoginPage = pathname === "/";

    const sensitiveRoutes = [
      "/users",
      "/conversations",
      "/classes",
      "/skills",
      "/spells",
      "/races",
    ];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/users", req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/users", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matchter: [
    "/",
    "/users/:path*",
    "/conversations/:path*",
    "/classes/:path*",
    "/races/:path*",
    "/skills/:path*",
    "/spells/:path*",
  ],
};
