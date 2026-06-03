import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createNextIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createNextIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/driver")) {
    let res = NextResponse.next({ request: { headers: req.headers } });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) { return req.cookies.get(name)?.value; },
          set(name, value, options) {
            req.cookies.set({ name, value, ...options });
            res = NextResponse.next({ request: { headers: req.headers } });
            res.cookies.set({ name, value, ...options });
          },
          remove(name, options) {
            req.cookies.set({ name, value: "", ...options });
            res = NextResponse.next({ request: { headers: req.headers } });
            res.cookies.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const isLoginPage = pathname === "/dashboard/login" || pathname === "/driver/login";

    if (!session && !isLoginPage) {
      const loginUrl = pathname.startsWith("/driver") ? "/driver/login" : "/dashboard/login";
      return NextResponse.redirect(new URL(loginUrl, req.url));
    }
    if (session && isLoginPage) {
      const homeUrl = pathname.startsWith("/driver") ? "/driver" : "/dashboard";
      return NextResponse.redirect(new URL(homeUrl, req.url));
    }
    return res;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
