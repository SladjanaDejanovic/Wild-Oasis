import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));

	// this is handy function from fns package we installed. takes 2 arguments, today's date and number of days we want to substruct from it (how many days ago, or in last 30 days)
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: bookings } = useQuery({
		queryFn: () => getBookingsAfterDate(queryDate),
		queryKey: ["bookings", `last-${numDays}`],
	});

	return { isLoading, bookings };
}
