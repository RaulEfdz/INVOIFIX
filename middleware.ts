import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware request:", request.method, request.nextUrl.pathname);
  // Example: You can add authentication or other logic here

  // Continue to the requested page
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
