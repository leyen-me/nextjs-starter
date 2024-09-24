export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/:path*",
    
    "/api/config/:path*",
    "/api/image",
    "/api/menu/:path*",
    "/api/user/:path*",
    "/api/role/:path*",
  ],
};
