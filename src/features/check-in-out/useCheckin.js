import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
			}),

		// onSuccess recieves data, which is value returned from the function
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);

			// this will invalidate all the queries that are currently active on the page (instead of using query keys)
			queryClient.invalidateQueries({ active: true });
			navigate("/");
		},

		onError: () =>
			toast.error("There was an error while checking in."),
	});

	return { checkin, isCheckingIn };
}