// Upgrade Guide (NextAuth.js v5)
// https://authjs.dev/getting-started/migrating-to-v5

import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

const { auth } = NextAuth(authConfig);

import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes
} from "@/routes";

export default auth(async (req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	// First, allow every single API route.
	if (isApiAuthRoute) {
		return;
	}

	// Are we on Auth route
	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(
				DEFAULT_LOGIN_REDIRECT,
				nextUrl
			));
		}

		return;
	}

	// If we are not logged in
	if (!isLoggedIn && !isPublicRoute) {

		// 7:41:55
		// If I logout from "http:localhost/settings", remember it
		// and when I login again redirect me to my last path.
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return Response.redirect(new URL(
			`/auth/login?callbackUrl=${encodedCallbackUrl}`,
			nextUrl
		));
	}
});

export const config = {
	matcher: [
		'/((?!.+\\.[\\w]+$|_next).*)',
		'/',
		'/(api|trpc)(.*)'
	],
}