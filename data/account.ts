import { db } from "@/lib/db";

// 6:56:51
export const getAccountByUserId = async (userId: string) => {
	try {
		const account = await db.account.findFirst({
			where: {
				userId
			}
		});

		return account;

	} catch (error) {
		return null;
	}
};