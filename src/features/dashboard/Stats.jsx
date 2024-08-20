import {
	HiOutlineBriefcase,
	HiOutlineChartBar,
} from "react-icons/hi";
import Stat from "./Stat";
import {
	HiOutlineBanknotes,
	HiOutlineCalendarDays,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	//1. number of bookings
	const numBookings = bookings.length;

	//2. total sales
	const sales = bookings.reduce(
		(acc, cur) => acc + cur.totalPrice,
		0
	);

	//3. total check-ins
	const checkins = confirmedStays.length;

	//4.occupancy rate (calculating it this way won't be 100% accurate, but we want to keep it simple)
	//num checked in nights / all available nights (whis is number of days * number of cabins)
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinCount);

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check-ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
}

export default Stats;
