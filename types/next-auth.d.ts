import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

/**
 * The module declaration can be added to any file that is “included”
 * in your project’s tsconfig.json.
*/

// Extending interface JWT
// 3:13:40
declare module "next-auth/jwt" {
	// interface JWT extends DefaultJWT {
	interface JWT {
		id: string,
		role?: UserRole
	}
}

// 3:11:52
// Add additional fields here to add in User in Session
export type ExtendedUser = DefaultSession["user"] & {
	role: UserRole;
	// 6:25:40
	isTwoFactorEnabled: boolean;
	// 6:57:35
	isOAuth: boolean;
};

// 3:09:44
declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}
