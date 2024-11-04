import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";

// Configure
// https://authjs.dev/getting-started/installation?framework=Next.js
// Prisma Adapter Setup: [https://authjs.dev/getting-started/adapters/prisma]
export const {
	handlers,
	auth
} = NextAuth({
	adapter: PrismaAdapter(db), // Non-Edge Prisma Adapter
	session: { strategy: "jwt" },
	...authConfig,
	// providers: [],
});