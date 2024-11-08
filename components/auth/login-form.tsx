"use client"

import * as z from "zod";
// 1:26:36
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
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
	const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
		? "Email already in use with different provider"
		: "";
	console.log(urlError);

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
		}
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {

		// 1:32:27 - Clearn all error and message stage
		setError("");
		setSuccess("");

		// 1:26:58
		startTransition(() => {
			login(values)
				.then((data) => {
					setError(data?.error);
					// TODO: Add when we add 2FA
					// setSuccess(data?.success);
				});
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormError message={error || urlError} />
					<FormSuccess message={success} />

					<Button
						disabled={isPending}
						type="submit"
						className="w-full"
					>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export { LoginForm }