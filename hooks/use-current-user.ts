import { useSession } from "next-auth/react";

// 6:00:55
/**
 * For use in client sides
 * @returns 
 */
export const useCurrentUser = () => {
	const session = useSession();

	return session.data?.user;
};