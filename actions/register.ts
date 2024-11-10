"use server"

// 1:28:49
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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

	const verificationToken = await generateVerificationToken(email);
	console.log("V Token:", verificationToken);

	// Send email to the new user
	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token
	);

	return { success: "Confirmation email sent!" };
}