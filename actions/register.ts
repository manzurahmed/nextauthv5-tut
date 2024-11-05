"use server"

// 1:28:49
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields!" }
	}

	const { name, email, password } = validatedFields.data;
	const hashedPassword = await bcryptjs.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return {
			error: "Email already in use!"
		};
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		}
	})

	// TODO: Send verification token email later

	return { success: "User created!" };
}