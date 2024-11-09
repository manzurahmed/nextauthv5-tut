"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

// 4:31:48
export const NewVerificationtion = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	// If token does not exist, return error
	if (!existingToken) {
		return {
			error: "Token does not exist!"
		};
	}

	// Has token expired?
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return {
			error: "Token has expired!"
		}
	}

	// Ensure user exists
	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return {
			error: "Email does not exist!"
		}
	}

	// New verification written to DB
	await db.user.update({
		where: {
			id: existingUser.id
		},
		data: {
			emailVerified: new Date(),
			email: existingToken.email, // Listen to 4:35:30
		}
	});

	// Remove the verification token
	await db.verificationToken.delete({
		where: {
			id: existingToken.id
		}
	});

	return {
		success: "Email verified!"
	}
}