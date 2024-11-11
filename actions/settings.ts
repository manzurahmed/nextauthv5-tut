"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

// 6:48:17
export const settings = async (
	values: z.infer<typeof SettingsSchema>
) => {

	const user = await currentUser();
	// If there is NO user, show return as "Unauthorized"
	if (!user) {
		return { error: "Unauthorized!" }
	}

	// Check the existence of the user in the DB
	const dbUser = await getUserById(user.id as string);

	if (!dbUser) {
		return {
			error: "Unauthorized!"
		}
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