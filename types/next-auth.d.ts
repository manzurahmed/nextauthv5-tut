import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

/**
 * The module declaration can be added to any file that is “included”
 * in your project’s tsconfig.json.
*/

// Extending interface JWT
// 3:13:40
declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string,
		role?: UserRole
	}
}

// 3:11:52
export type ExtendedUser = DefaultSession["user"] & {
	// id: string;
	role: UserRole;
};

// 3:09:44
declare module "next-auth" {
	interface User extends DefaultUser {
		role: UserRole,
	}

	interface Session {
		user: ExtendedUser;
	}
}
