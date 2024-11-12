"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
// 7:30:54
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

// 6:48:17
export const settings = async (
	values: z.infer<typeof SettingsSchema>
) => {

	// console.log("Settings SA:", values);

	const user = await currentUser();
	// If there is NO user, show return as "Unauthorized"
	if (!user) {
		return { error: "Unauthorized!" }
	}

	// Check the existence of the user in the DB
	const dbUser = await getUserById(user.id as string);

	if (!dbUser) {
		return {
			error: "Unauthorized user!"
		}
	}

	// 7:18:34
	// If the user is using OAuth
	// OAuth users can not modify these fields, because these are controlled by
	// the respective providers, like, Google, GitHub, etc.
	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	// If User's submit a different email that is used by another user,
	// throw the error saying, email already taken.
	if (values.email && values.email !== user.email) {

		const existingUser = await getUserByEmail(values.email);
		// Query in DB if incoming email is already used, return the error
		if (existingUser && existingUser.id !== user.id) {
			return {
				error: "Email already in use!"
			}
		}

		// Send verification token in email
		const verificationToken = await generateVerificationToken(
			values.email
		);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return {
			success: "Verification email send!"
		};
	}

	// 7:24:33
	// PASSWORD
	// Query in DB to check if the incoming password matches in the DB
	if (values.password && values.newPassword && dbUser.password) {
		const passwordMatch = await bcrypt.compare(
			values.password,
			dbUser.password
		);
		// If incoming password and password in DB do not match
		if (!passwordMatch) {
			return {
				error: "Incorrect password!"
			}
		}

		// Password match passed
		// Now change password
		const hashedPassword = await bcrypt.hash(
			values.newPassword,
			10
		);

		// assign new password
		values.password = hashedPassword;
		values.newPassword = undefined;
	}


	// Save date to DB
	await db.user.update({
		where: {
			id: dbUser.id
		},
		data: {
			...values
		}
	});

	return {
		success: "Settings Updated!"
	};
}