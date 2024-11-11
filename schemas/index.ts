import * as z from "zod";

// 6:47:48
export const SettingsSchema = z.object({
	name: z.optional(z.string())
});

// 5:11:01
export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum of 6 characters required."
	}),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: "Email is reqired."
	}),
});

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Email is reqired."
	}),
	password: z.string().min(1, {
		message: "Password is required"
	}),
	code: z.optional(z.string()),
});

// 1:35:00
export const RegisterSchema = z.object({
	email: z.string().email({
		message: "Email is reqired."
	}),
	password: z.string().min(6, {
		message: "Minimum 6 characters required"
	}),
	name: z.string().min(1, {
		message: "Name is required"
	})
});