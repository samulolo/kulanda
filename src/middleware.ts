import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, getExpectedAdminSessionToken } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  // A própria página de login (e o endpoint que a serve) tem de ficar
  // acessível sem sessão — senão ninguém consegue lá chegar para entrar.
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const expected = await getExpectedAdminSessionToken();
  const cookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!expected || cookie !== expected) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
