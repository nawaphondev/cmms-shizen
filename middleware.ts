import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/login", "/help", "/"];
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  // Attempt to read the token from cookies
  const token = request.cookies.get("token")?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "shizenchem");
      // jwtVerify will throw if the token is invalid or expired.
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      // Token verification failed.
      isAuthenticated = false;
    }
  }

  console.log(isAuthenticated)

  // If the route is protected and the user isn't authenticated, redirect to login.
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // (Optional) If an authenticated user attempts to access a public route like login, redirect them.
  if (isPublicRoute && isAuthenticated && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|shizen.svg).*)"],
};
