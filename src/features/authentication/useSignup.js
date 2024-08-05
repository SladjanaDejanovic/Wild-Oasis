import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: ({ fullName, email, password }) =>
			signupApi({ fullName, email, password }),

		onSuccess: (user) => {
			// console.log(user);
			toast.success(
				"Account successful created! Please verify the new account from the user's email address."
			);
		},

		onError: (err) => {
			console.log("ERROR", err);
			toast.error("Account could not be created");
		},
	});

	return { signup, isLoading };
}
