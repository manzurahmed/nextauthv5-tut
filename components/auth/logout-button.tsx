"use client";

// I can directly use next-auth signOut,
// but, in the "logout" server actions, I can do stuffs after signout.
import { logout } from "@/actions/logout";
// import { signOut } from "next-auth/react";

// 6:08:10
interface LogoutButtonProps {
	children?: React.ReactNode;
};

export const LogoutButton = ({
	children
}: LogoutButtonProps) => {

	const onClick = () => {
		logout();
	};

	return (
		<span
			onClick={onClick}
			className="cursor-pointer"
		>
			{children}
		</span>
	);
}