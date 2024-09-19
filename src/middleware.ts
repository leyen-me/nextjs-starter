export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/config/:path*",
    "/api/user/:path*",
    "/api/menu/:path*",
    "/api/role/:path*",
  ],
};
