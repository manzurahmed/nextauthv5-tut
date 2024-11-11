import { useSession } from "next-auth/react";

// 6:31:33
/**
 * For use in client components i.e., client side.
 */
export const useCurrentRole = () => {
	const session = useSession();

	return session.data?.user?.role;
};