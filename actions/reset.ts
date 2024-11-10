"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

// 4:55:37
export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid email!"
		}
	}

	const { email } = validatedFields.data;
	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return {
			error: "Email not found!"
		}
	}

	// 5:06:04
	// Generate new token
	const passwordResetToken = await generatePasswordResetToken(email);
	console.log(passwordResetToken);

	// Set password reset email
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	);

	return {
		success: "Reset email sent!"
	}
};