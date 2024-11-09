import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";

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