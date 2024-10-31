import { db } from "@/lib/db";

// 2:02:52
export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				email
			}
		});

		return user;
	} catch (error) {
		return null;
	}
};

// 2:03:30
export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				id
			}
		});

		return user;
	} catch (error) {
		return null;
	}
};