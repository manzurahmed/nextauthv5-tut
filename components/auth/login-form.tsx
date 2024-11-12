"use client"

import * as z from "zod";
// 1:26:36
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import Link from "next/link";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";


// 51:59
const LoginForm = () => {

	// 3:43:44
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl")
	console.log("Login Form callabackUrl:", callbackUrl);

	const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
		? "Email already in use with different provider"
		: "";
	console.log(urlError);

	// 5:43:52
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	// 1:30:53
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	// 1:26:47
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
			code: "",
		}
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {

		// 1:32:27 - Clearn all error and message stage
		setError("");
		setSuccess("");

		// 1:26:58
		// User can't login without 2FA confirmation in each signIn
		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {

					if (data?.error) {
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Something went wrong!"));
		})
	}

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						{/** On getting 2FA code, show 2FA verification form */}
						{
							showTwoFactor && (
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Two Factor Code</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="123456"
													type="digit"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)
						}

						{/** Show login form until we get 2FA code */}
						{
							!showTwoFactor &&
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
													disabled={isPending}
													placeholder="john.doe@example.com"
													type="email"
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
													disabled={isPending}
													placeholder="******"
													type="password"
												/>
											</FormControl>

											{/** Forgot Email */}
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href="/auth/reset">
													Forgot password?
												</Link>
											</Button>

											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						}
					</div>

					<FormError message={error || urlError} />
					<FormSuccess message={success} />

					<Button
						disabled={isPending}
						type="submit"
						className="w-full"
					>
						{
							showTwoFactor ? "Confirm" : "Login"
						}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export { LoginForm }