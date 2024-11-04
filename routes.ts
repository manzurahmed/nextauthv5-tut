// 2:25:34
// https://youtu.be/1MTyCvS05V4?t=8735

/**
 * List all the routes the LOGGED-OUT users can visit.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
	"/"
];

/**
 * List all the routes for the AUTHENTICATED USERS.
 * These routes DO REQUIRE authentication.
 * These routes will redirect logged in users to the "/settings" page.
 * @type {string[]}
 */
export const authRoutes = [
	"/auth/login",
	"/auth/register",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
