import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
	const {
		isLoading,
		data: user,
		isFetching,
	} = useQuery({
		// if there is auth user react query will get it from cache (in useLogin hook)
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	return {
		isLoading,
		user,
		isAuthenticated: user?.role === "authenticated",
		isFetching,
	};
}
