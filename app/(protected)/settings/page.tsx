"use client";

// 6:50:27
import {
	Card,
	CardHeader,
	CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useTransition } from "react";

// import { useSession } from "next-auth/react";
// 5:59:52
// import { logout } from "@/actions/logout";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { useSession, signOut } from "next-auth/react";
// import { auth, signOut } from "@/auth"

// 2:24:13
// const SettingsPage = async () => {
const SettingsPage = () => {

	// 6:01:18
	// const user = useCurrentUser();
	// console.log(user);

	// const session = await auth();
	// console.log("User", session?.user);

	// 5:56:31
	// const session = useSession();
	// console.log("Settings Page:", session);

	// 5:58:27
	// SignOut
	// const onClick = () => {
	// 	// signOut();

	// 	// Alternate way to logout
	// 	logout();
	// };

	// 6:51:54
	const [isPending, startTransition] = useTransition();

	// 6:51:24
	const onClick = () => {
		startTransition(() => {
			settings({
				name: "New Name"
			});
		})
	};

	return (
		<div className="bg-white p-10 rounded-md">

			{/** This is exclusively for Server Component */}
			{/*
			<form
				action={async () => {
					"use server";

					await signOut();
				}}
			>
			<Button
				onClick={onClick}
				type="submit"
			>
				Sign out
			</Button>
			*/
			}

			<Card className="w-[600px]">
				<CardHeader>
					<p className="text-2xl font-semibold text-center">
						🔩 Settings
					</p>
				</CardHeader>
				<CardContent>
					<Button
						disabled={isPending}
						onClick={onClick}
					>
						Update name
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

export default SettingsPage