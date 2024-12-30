import Filter from "../ui/Filter";
import InputSearch from "../ui/InputSearch";
import SortBy from "../ui/SortBy";
import TableOperations from "../ui/TableOperations";

const CabinTableOperations = () => {
  const filterOptions = [
    { title: "All", value: "all" },
    { title: "With Discount", value: "with-discount" },
    { title: "No Discount", value: "no-discount" },
  ];

  const sortByOptions = [
    { title: "Sort by default", value: "id-desc" },
    { title: "Sort by name (Ascending)", value: "name-asc" },
    { title: "Sort by name (Descending)", value: "name-desc" },
    { title: "Sort by price (Ascending)", value: "regular_price-asc" },
    { title: "Sort by price (Descending)", value: "regular_price-desc" },
    { title: "Sort by max capacity (Ascending)", value: "max_capacity-asc" },
    { title: "Sort by max capacity (Descending)", value: "max_capacity-desc" },
  ];

  return (
    <TableOperations>
      <Filter queryName="discount" options={filterOptions} />
      <SortBy options={sortByOptions} />
      <InputSearch placeholder="Search Name" />
    </TableOperations>
  );
};

export default CabinTableOperations;
