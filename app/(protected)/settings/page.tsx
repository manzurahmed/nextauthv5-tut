import { auth } from "@/auth"

// 2:24:13
const SettingsPage = async () => {

	const session = await auth();

	return (
		<div>
			{
				JSON.stringify(session)
			}
		</div>
	)
}

export default SettingsPage