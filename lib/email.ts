import { Resend } from "resend";

// 4:12:27
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
	email: string,
	token: string
) => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Confirm your email",
		html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email address.</p>`
	})
}