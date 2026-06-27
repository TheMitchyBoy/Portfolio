/**
 * Middleware — adds noindex headers to /admin routes.
 *
 * The admin dashboard is intentionally unlisted (no navbar link, robots.txt
 * disallow). This header catches crawlers that ignore robots.txt.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Keep /admin out of search indexes and add a noindex header for crawlers
// that ignore robots.txt.
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
