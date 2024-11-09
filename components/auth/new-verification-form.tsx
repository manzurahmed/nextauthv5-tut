"use client";

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { NewVerificationtion } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

// 4:26:39
export const NewVerificationForm = () => {

	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const onSubmit = useCallback(() => {
		// console.log((token))

		// If there is no "token" exists in the URL, do not check anything.
		if (!token) {
			setError("Missing token!");
			return;
		}

		// Go for token verification
		NewVerificationtion(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError("Something went wrong!");
			});
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel="Confirming your verification"
			backButtonLabel="Back to login"
			backButtonHref=""
		>
			<div className="flex flex-col gap-4 items-center w-full justify-center">
				<BeatLoader />
				<FormError message={error} />
				<FormSuccess message={success} />
			</div>
		</CardWrapper>
	)
};