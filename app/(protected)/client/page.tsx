"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

// 6:15:29
const ClientPage = () => {

	const user = useCurrentUser();

	return (
		<div>
			<UserInfo
				user={user}
				label="🖥️ Client component"
			/>
		</div>
	);
};

export default ClientPage;
