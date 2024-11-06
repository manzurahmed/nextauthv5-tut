"use client"

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

	// 3:28:43
	const onClick = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className="flex items-center w-full gap-x-2">

			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick("google")}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>

			{/** When a user signIn using Github authorization,
			 * a new record will be opened in the User table and
			 * an linked record will be opened in the Account table in the DB.
			 */}
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick("github")}
			>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	)
}