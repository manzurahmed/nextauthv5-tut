import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// 2:38:17
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		Github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Credentials({
			async authorize(credentials, request) {
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					// Inside auth.config.js, we can freely use Prisma in providers credentials,
					// because, it does not run on "Edge".

					const user = await getUserByEmail(email);
					// User who logged in using Google or GitHub does not have password
					if (!user || !user.password) {
						return null;
					}

					const passwordMatch = await bcryptjs.compare(
						password,
						user.password
					);

					if (passwordMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							emailVerified: user.emailVerified,
							image: user.image,
						};
					}

					return null;
				}

				return null;
			}
		})
	],
	// Add other NextAuth configuration options here
} satisfies NextAuthConfig;