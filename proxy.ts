import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, PUBLICROUTES, APIAuthPrefix, AUTHROUTES, APIAiAnswerPrefix } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  // checking if user is currently logged in because req.auth will have a session object is user is logged in
  const isLoggedIn = !!req.auth;

  // we don't want to protect all these routes because they are our routes which will be used for authencation
  const isApiAuthRoute = nextUrl.pathname.startsWith(APIAuthPrefix) || nextUrl.pathname.startsWith(APIAiAnswerPrefix);
  if (isApiAuthRoute) return null;

  // already logged in user will be able to go to these pages and will not be able to go to these pages and will be redirected back to "/" route or if user is logged out they will be redirected to the auth page
  const isAuthRoute = AUTHROUTES.includes(nextUrl.pathname);
  if (isAuthRoute) {
    // already logged in
    if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    // logged out accessing the auth routes
    return null;
  }

  // function to check if a route is public
  const isPublicRoute = (pathname: string) => {
    return PUBLICROUTES.some((route) => {
      // convert dynamic segments :id into regex
      const pattern = new RegExp("^" + route.replace(/:[^\/]+/g, "[^/]+") + "$");
      return pattern.test(pathname);
    });
  };

  // usage
  const pathname = nextUrl.pathname;
  if (!isLoggedIn && !isPublicRoute(pathname)) {
    return Response.redirect(new URL("/auth/log-in", nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
