"use server"

// 1:28:49
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import {
	sendVerificationEmail,
	sendTwoFactorTokenEmail
} from "@/lib/mail";
import {
	generateVerificationToken,
	generateTwoFactorToken
} from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
	values: z.infer<typeof LoginSchema>,
	callbackUrl?: string | null
) => {

	// Check incoming data
	const validatedFields = LoginSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Invalid fields!" }
	}

	const { email, password, code } = validatedFields.data;

	// 3:58:44
	const existingUser = await getUserByEmail(email);

	// If there is no user, or, email, or, password
	if (!existingUser || !existingUser.email || !existingUser?.password) {
		return {
			error: "Email does not exists!"
		}
	}

	// 5:41:30
	// 2FA confirmation
	if (existingUser.isTwoFactorEnabled && existingUser.email) {

		// 1. If we have the code, we verify the code
		// 2. Else, we send email with 2FA code
		if (code) {
			// Get existing 2FA code
			const twoFactorToken = await getTwoFactorTokenByEmail(
				existingUser.email
			);
			// If there is no 2FA data in DB
			if (!twoFactorToken) {
				return {
					error: "Invalid code!"
				}
			}
			// On incoming code DOES NOT MATCH code in DB
			if (twoFactorToken.token !== code) {
				return {
					error: "Invalid code!"
				}
			}
			// Check code expiry time
			const hasExpired = new Date(twoFactorToken.expires) < new Date();
			if (hasExpired) {
				return {
					error: "Code expired!"
				}
			}

			// Finally, we can delete the 2FA code from DB
			await db.twoFactorToken.delete({
				where: {
					id: twoFactorToken.id
				}
			});

			// Get existing confirmation
			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			);
			// if there is confirmation in DB, remove it
			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: {
						id: existingConfirmation.id
					}
				});
			}

			// Save confirmation to DB
			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id
				}
			});

		} else {
			// Get 6-digit token
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			// Send 2FA email
			await sendTwoFactorTokenEmail(
				twoFactorToken.email,
				twoFactorToken.token
			);

			return { twoFactor: true };
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
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
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