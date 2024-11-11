"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
// import { currentRole } from "@/lib/auth";
// import { useCurrentRole } from "@/hooks/use-current-role";

// 6:30:35
const AdminPage = () => {
	// const AdminPage = async () => {

	// 6:32:20
	// const role = useCurrentRole();
	// const role = currentRole();

	// 6:45:15
	const onServerActionClick = () => {
		admin()
			.then((data) => {
				if (data.error) {
					toast.error(data.error);
				}

				if (data.success) {
					toast.success(data.success);
				}
			});
	};

	const onApiRouteClick = () => {
		fetch("/api/admin")
			.then((response) => {
				if (response.ok) {
					console.log("OKAY");
					toast.success("Allowed API Route");
				} else {
					console.log("FORBIDDEN");
					toast.success("Forbidden API Route");
				}
			})
	};

	return (
		<Card className="w-[600px]">
			{/* Current Role in Client Component: {role} */}
			{/* Current Role in Server Component: {role} */}
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					Admin
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate
					allowedRole={UserRole.ADMIN}
				>
					<FormSuccess
						message="You are allowed to view this conent!"
					/>
				</RoleGate>

				<div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
					<p className="text-sm font-medium">
						Admin-only API Route
					</p>
					<Button
						onClick={onApiRouteClick}
					>
						Click to test
					</Button>
				</div>

				<div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
					<p className="text-sm font-medium">
						Admin-only Server Action
					</p>
					<Button
						onClick={onServerActionClick}
					>
						Click to test
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminPage;
