import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import TableOperations from "../ui/TableOperations";

const BookingTableOperations = () => {
  const filterOptions = [
    { title: "All", value: "all" },
    { title: "Checked In", value: "checked-in" },
    { title: "Checked Out", value: "checked-out" },
    { title: "Unconfirmed", value: "unconfirmed" },
  ];

  const sortByOptions = [
    { title: "Sort by default", value: "id-desc" },
    { title: "Sort by date (Ascending)", value: "start_date-asc" },
    { title: "Sort by date (Descending)", value: "start_date-desc" },
    { title: "Sort by amount (Ascending)", value: "total_price-asc" },
    { title: "Sort by amount (Descending)", value: "total_price-desc" },
  ];

  return (
    <TableOperations>
      <Filter queryName="status" options={filterOptions} />
      <SortBy options={sortByOptions} />
    </TableOperations>
  );
};

export default BookingTableOperations;
