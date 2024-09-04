// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const TableHeader = styled.header`
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 
// 	background-color: var(--color-grey-50);
// 	border-bottom: 1px solid var(--color-grey-100);
// 	text-transform: uppercase;

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!cabins.length) return <Empty resourceName="cabins" />;

	// FILTER
	// setting "all" as default when we first visit page
	const filterValue = searchParams.get("discount") || "all";

	let filteredCabins;
	if (filterValue === "all") filteredCabins = cabins;
	if (filterValue === "no-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === "with-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

	// SORT
	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	const [field, direction] = sortBy.split("-");

	const modifier = direction === "asc" ? 1 : -1;

	const sortedCabins = filteredCabins?.sort((a, b) =>
		typeof a[field] === "string"
			? a[field].localeCompare(b[field]) * modifier
			: (a[field] - b[field]) * modifier
	);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={(cabin) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
