import { Resend } from "resend";

// 4:12:27
const resend = new Resend(process.env.RESEND_API_KEY);

// 5:33:53
export const sendTwoFactorTokenEmail = async (
	email: string,
	token: string,
) => {

	// Send email
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "2FA Code",
		html: `<p>Your 2FA code: ${token}</p>`
	});
};

// 5:03:57
export const sendPasswordResetEmail = async (
	email: string,
	token: string
) => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const resetLink = `${baseUrl}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Reset your email",
		html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
	})
}


export const sendVerificationEmail = async (
	email: string,
	token: string
) => {

	console.log("sendVerificationEmail:", email, token);

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Confirm your email",
		html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email address.</p>`
	})
}

