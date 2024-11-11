import { auth } from "@/auth";

/**
 * Returns the current user object. This can be used in * Server Component, *Server Actions, and in the *API routes. 
*/
export const currentUser = async () => {
	// 6:16:48
	const session = await auth();

	return session?.user;
};


/**
 * Returns the role of the current user. This can be used in * Server Component, *Server Actions, and in the *API routes. 
*/
export const currentRole = async () => {
	// 6:32:43
	const session = await auth();

	return session?.user?.role;
};
