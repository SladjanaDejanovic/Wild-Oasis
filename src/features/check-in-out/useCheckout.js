import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
	const queryClient = useQueryClient();

	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-out",
			}),

		// onSuccess recieves data, which is value returned from the function
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`);

			// this will invalidate all the queries that are currently active on the page (instead of using query keys)
			queryClient.invalidateQueries({ active: true });
		},

		onError: () =>
			toast.error("There was an error while checking in."),
	});

	return { checkout, isCheckingOut };
}
