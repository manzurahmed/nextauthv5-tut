import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
	providers: [
		Credentials({
			// Your credentials configuration
		})
	],
	// Add other NextAuth configuration options here
} satisfies NextAuthConfig;