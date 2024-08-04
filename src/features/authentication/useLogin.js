import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) =>
			loginApi({ email, password }),

		onSuccess: (data) => {
			// console.log(user);
			// to manually set some data into react query cache
			queryClient.setQueryData(["user"], data.user);
			toast.success("Login successful");
			navigate("/dashboard", { replace: true });
		},

		onError: (err) => {
			console.log("ERROR", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoading };
}
