import { db } from "@/lib/db";

// 5:00:12
export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordResetToken = await db.passwordResetToken.findUnique({
			where: {
				token
			}
		});

		return passwordResetToken;
	} catch (error) {
		return null;
	}
};


export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const passwordResetToken = await db.passwordResetToken.findFirst({
			where: {
				email
			}
		});

		return passwordResetToken;
	} catch (error) {
		return null;
	}
};