"use server";

import { signOut } from "@/auth";

// 5:59:01

export const logout = async () => {
	// You can do some server-centric stuffs here if necessary
	await signOut();
};