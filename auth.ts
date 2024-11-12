// import NextAuth, { type DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
// 5:37:05
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

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
	// 3:37:35
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	// 3:34:55
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: {
					id: user.id
				},
				data: {
					emailVerified: new Date()
				}
			})
		}
	},
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

		// 4:04:04
		async signIn({ user, account }) {

			// console.log(
			// 	user,
			// 	account
			// )

			// Allow OAuth without email verification
			// IF YOU HAVE MORE PROVIDERS, CHANGE HERE TO SUITE YOUR NEEDS
			if (account?.provider !== "credentials") {
				return true;
			}

			const existingUser = await getUserById(user?.id as string);

			// Prevent sign in without email verification
			if (!existingUser?.emailVerified) {
				return false;
			}

			// 2FA check
			// 5:36:19
			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

				// console.log(
				// 	"Auth signIn:",
				// 	{ twoFactorConfirmation }
				// )

				// If we don't have confirmation, then return false
				if (!twoFactorConfirmation) {
					return false;
				}

				// Delete two factor confirmation for next sign in
				// For next sign in, 2FA confirmation is must
				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id
					}
				});
			}

			return true;
		},

		// In auth.js in NextAuth v5, Session uses the token to actually generate the session.
		async session({ token, session }) {
			// session in both "session" and "jwt" are identical
			// console.log(({ sessionToken: token }));

			// Pass the user's Id in the session from token.sub
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			// Pass the Role in the session from token
			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}
			// Pass the 2FA in the session from token
			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as unknown as boolean;
			}
			// When any info of User changed from Settings page, update here too
			if (session.user) {
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.isOAuth = token.isOAuth as boolean;
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as unknown as boolean;
			}

			return session;
		},

		// async jwt(token) {
		async jwt({ token }) {

			console.log("AUTH.TS JWT!!!");

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
			// If there is not user in the DB, return the token intact
			if (!existingUser) {
				return token;
			}

			// 6:57:46
			// Get user's account by User ID from Account table
			const existingAccount = await getAccountByUserId(
				existingUser.id
			);

			token.name = existingUser?.name;
			token.email = existingUser?.email;
			token.role = existingUser?.role;
			token.isTwoFactorEnabled = existingUser?.isTwoFactorEnabled;
			// 6:58:01
			token.isOAuth = !!existingAccount; // Made it "boolean"

			return token;
		}
	},
	adapter: PrismaAdapter(db), // Non-Edge Prisma Adapter
	session: { strategy: "jwt" },
	...authConfig,
	// providers: [],
});