import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareSupabase } from "./lib/supabase/clients";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const res = NextResponse.next();
  const supabase = createMiddlewareSupabase(req, res);

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user ?? null;

  if (pathname.startsWith("/login")) {
    return user ? NextResponse.redirect(new URL("/projects", req.url)) : res;
  }

  if (pathname.startsWith("/projects")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/projects/:path*", "/login"],
};
