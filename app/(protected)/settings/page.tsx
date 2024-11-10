"use client";

import { useSession } from "next-auth/react";
// 5:59:52
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
// import { useSession, signOut } from "next-auth/react";

// import { auth, signOut } from "@/auth"

// 2:24:13
// const SettingsPage = async () => {
const SettingsPage = () => {

	// const session = await auth();
	// console.log("User", session?.user);

	// 5:56:31
	const session = useSession();
	console.log("Settings Page:", session);

	// 5:58:27
	// SignOut
	const onClick = () => {
		// signOut();

		// Alternate way to logout
		logout();
	};


	return (
		<div>
			{
				JSON.stringify(session)
			}

			{/** This is exclusively for Server Component */}
			{/*
			<form
				action={async () => {
					"use server";

					await signOut();
				}}
			>*/
			}

			<Button
				onClick={onClick}
				type="submit"
			>
				Sign out
			</Button>
		</div>
	);
}

export default SettingsPage