// 5:30:25
import crypto from "crypto"; // build-in package

import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

// 5:31:03
export const generateTwoFactorToken = async (email: string) => {

	// Generate 6 digit token
	const token = crypto.randomInt(100000, 1000000).toString();

	// Token expires in 5 minutes
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

	// Get existing token by email
	const existingToken = await getTwoFactorTokenByEmail(email);

	// Delete existing token from DB
	if (existingToken) {
		await db.twoFactorToken.delete({
			where: {
				id: existingToken.id
			}
		});
	}

	// Create a new token
	const twoFactorToken = await db.twoFactorToken.create({
		data: {
			email,
			token,
			expires
		}
	});

	return twoFactorToken;
};

// 5:02:14
export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getPasswordResetTokenByEmail(email);

	// Delete existing token, if any
	if (existingToken) {
		await db.passwordResetToken.delete({
			where: {
				id: existingToken.id
			}
		});
	}

	// Create new token
	const passwordResetToken = await db.passwordResetToken.create({
		data: {
			email,
			token,
			expires
		}
	});

	return passwordResetToken;
};

// 3:52:15
export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();

	// Token expires in 1 hour
	// Time + 3600 seconds (1 Hour) * milliseconds
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	// Find and get the existing verification token
	const existingToken = await getVerificationTokenByEmail(email);

	// Delete the existing token
	if (existingToken) {
		await db.verificationToken.delete({
			where: {
				id: existingToken.id,
			}
		})
	}

	// Save the NEW Verification Token to the DB
	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		}
	})

	return verificationToken;
};