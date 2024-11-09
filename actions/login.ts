"use server"

// 1:28:49
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/email";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields!" }
	}

	const { email, password } = validatedFields.data;

	// 3:58:44
	const existingUser = await getUserByEmail(email);

	// If there is no user, or, email, or, password
	if (!existingUser || !existingUser.email || !existingUser?.password) {
		return {
			error: "Email does not exists!"
		}
	}

	// If email is NOT verified
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		// Send verification email
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return {
			success: "Confirmation email sent!"
		}
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});

		// return {
		// 	success: "Login successfully"
		// }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						error: "Invalid credentials!"
					}
				default:
					return {
						error: "Something went wrong!"
					}
			}
		}

		// Throw this error, else it won't redirect you
		throw error;
	}
}