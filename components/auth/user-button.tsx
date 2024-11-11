"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
	Avatar,
	AvatarImage,
	AvatarFallback
} from "@/components/ui/avatar";
import { CircleUserRound, LogOut } from 'lucide-react';
import { LogoutButton } from "@/components/auth/logout-button";

// 6:10:18
export const UserButton = () => {

	const user = useCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage
						src={user?.image || ""}
					/>
					<AvatarFallback className="bg-sky-500">
						<CircleUserRound className="text-white w-4 h-4" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-40" align="end">
				<LogoutButton>
					<DropdownMenuItem>
						<LogOut className="w-4 h-4 mr-2" />
						Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};