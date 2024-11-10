import { db } from "@/lib/db";

// 5:29:01
export const getTwoFactorConfirmationByUserId = async (
	userId: string
) => {
	try {
		const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
			where: {
				userId
			}
		});

		return twoFactorConfirmation;
	} catch (error) {
		return null;
	}
};