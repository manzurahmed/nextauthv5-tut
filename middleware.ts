// Upgrade Guide (NextAuth.js v5)
// https://authjs.dev/getting-started/migrating-to-v5

import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	console.log("ROUTE:", nextUrl.pathname);
	console.log("IS LOGGED IN:", isLoggedIn);

	// Add your middleware logic here
	// For example, protect specific routes:
	// if (!isLoggedIn && nextUrl.pathname.startsWith('/protected')) {
	//   return Response.redirect(new URL('/auth/login', nextUrl));
	// }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: [
		'/((?!.+\\.[\\w]+$|_next).*)',
		'/',
		'/(api|trpc)(.*)'
	],
}