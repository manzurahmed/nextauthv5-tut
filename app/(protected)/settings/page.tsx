import { auth, signOut } from "@/auth"

// 2:24:13
const SettingsPage = async () => {

	const session = await auth();
	console.log("User", session?.user);


	return (
		<div>
			{
				JSON.stringify(session)
			}

			{/** This is exclusively for Server Component */}
			<form
				action={async () => {
					"use server";

					await signOut();
				}}
			>
				<button type="submit">
					Sign out
				</button>
			</form>
		</div>
	)
}

export default SettingsPage