import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

// 6:15:29
const ServerPage = async () => {

	const user = await currentUser();

	return (
		<div>
			<UserInfo
				user={user}
				label="💻 Server component"
			/>
		</div>
	);
};

export default ServerPage;
