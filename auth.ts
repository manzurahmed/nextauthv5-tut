import NextAuth from "next-auth";

// Configure
// https://authjs.dev/getting-started/installation?framework=Next.js
export const {
	handlers,
	signIn,
	signOut,
	auth
} = NextAuth({
	providers: [],
});