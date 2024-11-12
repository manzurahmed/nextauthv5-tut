"use client";

// 6:58:33
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";

// 6:50:27
import {
	Card,
	CardHeader,
	CardContent
} from "@/components/ui/card"

// 6:58:57
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useTransition, useState } from "react";
// 6:53:50
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// import { useSession } from "next-auth/react";
// 5:59:52
// import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { useSession, signOut } from "next-auth/react";
// import { auth, signOut } from "@/auth"

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";

// 2:24:13
// const SettingsPage = async () => {
const SettingsPage = () => {

	// 6:53:59
	const { update } = useSession();

	// 6:01:18
	const user = useCurrentUser();
	// console.log("Settings page:", user);

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

	// 7:00:30
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	// 6:51:54
	const [isPending, startTransition] = useTransition();

	// 6:59:27
	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			password: undefined,
			newPassword: undefined,
			name: user?.name || undefined, // Do not use like, user?.name || ""
			email: user?.email || undefined,
			role: user?.role || undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
		}
	});

	// 6:51:24
	// const onClick = () => {
	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

		// console.log("Settings on:", values);

		// Please note that,
		// When I update any column value from here,
		// I also need to update the same information
		// in both the *Session* and *JWT Token* from "./auth.ts".
		startTransition(() => {
			settings(values)
				// 6:54:08
				.then((data) => {

					// 7:00:51
					if (data.error) {
						setError(data.error)
					}

					if (data.success) {
						update(); // Update the session
						setSuccess(data.success);
					}
				})
				.catch(() => setError("Something went wrong!"));
		});
	};

	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					🔩 Settings
				</p>
			</CardHeader>

			<CardContent>
				{/* <Button
						disabled={isPending}
						onClick={onClick}
					>
						Update name
					</Button> */}

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="John Doe"
												disabled={isPending}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							{/** OAuth Users can't view these fields */}
							{
								user?.isOAuth === false && (
									<>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="john.doe@example.com"
															type="email"
															disabled={isPending}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Password</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="******"
															type="password"
															disabled={isPending}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="newPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>New Password</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="******"
															type="password"
															disabled={isPending}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									</>
								)
							}

							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={UserRole.ADMIN}>
													Admin
												</SelectItem>
												<SelectItem value={UserRole.USER}>
													User
												</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>

							{/** OAuth Users can't view these fields */}
							{
								user?.isOAuth === false && (
									<FormField
										control={form.control}
										name="isTwoFactorEnabled"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
												<div className="space-y-0.5">
													<FormLabel>Two Factor Authentication</FormLabel>
													<FormDescription>
														Enable two factor authentication for your account
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														disabled={isPending}
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								)
							}

						</div>

						<FormError message={error} />
						<FormSuccess message={success} />

						<Button
							disabled={isPending}
							type="submit"
						>
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default SettingsPage