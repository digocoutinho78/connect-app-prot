import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseBasicCredentials(
  authHeader: string | null,
): { user: string; password: string } | null {
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return null;
  }
  const base64Credentials = authHeader.slice(6).trim();
  if (!base64Credentials) {
    return null;
  }
  try {
    const decoded = atob(base64Credentials);
    const colonIndex = decoded.indexOf(":");
    if (colonIndex === -1) {
      return null;
    }
    return {
      user: decoded.slice(0, colonIndex),
      password: decoded.slice(colonIndex + 1),
    };
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const parsed = parseBasicCredentials(authHeader);

  if (!parsed) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const { user, password } = parsed;
  const validUser = process.env.BASIC_AUTH_USER;
  const validPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!validUser || !validPassword) {
    return new Response("Basic auth is not configured", { status: 500 });
  }

  if (user !== validUser || password !== validPassword) {
    return new Response("Access denied", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
