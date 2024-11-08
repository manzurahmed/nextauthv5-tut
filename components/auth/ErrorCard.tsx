import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

// 3:38:55
const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Oops! Something went wrong"
			backButtonHref="/auth/login"
			backButtonLabel="Back to login"
		>
			<div className="flex justify-center items-center w-full">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	)
}

export default ErrorCard;