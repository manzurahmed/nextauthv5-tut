// Upgrade Guide (NextAuth.js v5)
// https://authjs.dev/getting-started/migrating-to-v5

import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
// 2:22:44
const { auth } = NextAuth(authConfig);
// 2:28:54
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes
} from "@/routes";

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	// 2:30:24
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	// 2:30:58
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	// The order of this "if clauses" DO MATTERS
	// First, allow every single api route
	if (isApiAuthRoute) {
		return null;
	}

	// Are we on Auth route
	// 2:32:15
	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(
				DEFAULT_LOGIN_REDIRECT,
				nextUrl
			));
		}

		return null;
	}

	// 2:34:58
	// If we are not logged in
	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL(
			"/auth/login",
			nextUrl
		));
	}
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: [
		'/((?!.+\\.[\\w]+$|_next).*)',
		'/',
		'/(api|trpc)(.*)'
	],
}