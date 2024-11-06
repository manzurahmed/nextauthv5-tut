// import NextAuth, { type DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

// 3:09:44
/*
declare module "next-auth" {
	interface Session {
		user: {
			role: string;
		} & DefaultSessi`on["user"];
	}
}
*/

// Configure
// https://authjs.dev/getting-started/installation?framework=Next.js
// Prisma Adapter Setup: [https://authjs.dev/getting-started/adapters/prisma]
export const {
	handlers,
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {

		// 3:18:42
		/*
		async signIn({ user }) {
			const existingUser = await getUserById(user.id as string);

			// If a user exists but its email is NOT VERIFIED,
			// do not let the user log in.
			if (!existingUser || !existingUser.emailVerified) {
				return false;
			}

			return true;
		},
		*/

		// In auth.js in NextAuth v5, Session uses the token to actually generate the session.
		async session({ token, session }) {
			// session in both "session" and "jwt" are identical
			console.log(({ sessionToken: token }));

			// Pass the user's Id in the session from token.sub
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			// Pass the Role in the session from token
			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}

			return session;
		},

		// async jwt(token) {
		async jwt({ token }) {
			// Besides "token", "jwt" contains "user", "account", "profile", etc.
			// objects. But, "user", "account", "profile" objects are shown "undefined".
			// How to use them?

			/*
			// Let's see the original token in the console
			console.log({ token });
			{
				token: {
					name: 'Mr. Test',
					email: 'test@gmail.com',
					picture: null,
					sub: 'cm35ebu350000cs6ydm2zz7br', // THIS IS USER ID IN DB
					iat: 1730869297,
					exp: 1733461297,
					jti: '78069060-e1b7-49da-99ca-50290739c8d7'
				}
			}
			*/

			// Let add a custom field to the "token". This new value will be
			// passed down to "session" callback
			// token.customField = "Test";
			// console.log({ token });

			// 3:05:42
			if (!token.sub) {
				// If I don't have "sub", that means, I am logged out.
				return token;
			}
			// Get the User from the DB
			const existingUser = await getUserById(token.sub);
			token.role = existingUser?.role;

			return token;
		}
	},
	adapter: PrismaAdapter(db), // Non-Edge Prisma Adapter
	session: { strategy: "jwt" },
	...authConfig,
	// providers: [],
});