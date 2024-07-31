import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
	const { bookingId } = useParams();

	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ["booking", bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false, //react query by default tries to fetch data 3 times in case if failed in the beginning, so in some cases that doesn't make much sense, like here, if it failed means there's no data
	});
	return { isLoading, error, booking };
}
