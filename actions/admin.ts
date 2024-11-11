"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// 6:44:33
export const admin = async () => {
	const role = await currentRole();

	if (role === UserRole.ADMIN) {
		return {
			success: "Allowed!"
		};
	}

	return {
		error: "Forbidden Server Action!"
	};
};