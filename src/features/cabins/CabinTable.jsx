import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import NoData from "../../ui/NoData";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const TableFooter = styled.footer`
  background-color: var(--color-grey);
  display: flex;
  justify-content: center;
  padding: 2rem 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const CabinTable = () => {
  const [searchParams] = useSearchParams();

  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const filteredValue = searchParams.get("discount") || "all";
  const sortedValue = searchParams.get("sortBy") || "id-desc";
  const currentPage = searchParams.get("page") || 1;
  const rowsPerPage = searchParams.get("rowsPerPage") || 10;

  const search = searchParams.get("search") || "";

  const firstCabinIndex = (currentPage - 1) * rowsPerPage;
  const lastCabinIndex = currentPage * rowsPerPage;

  // FOR FILTERING
  let filteredCabins;

  if (filteredValue === "all") filteredCabins = cabins;

  if (filteredValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

  if (filteredValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount !== 0);

  // FOR SORTING
  const [field, order] = sortedValue.split("-");
  const modifier = order === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins
    ?.sort((a, b) => {
      if (typeof a[field] === "string" && typeof b[field] === "string") {
        return a[field].localeCompare(b[field]) * modifier;
      }
      return (a[field] - b[field]) * modifier;
    })
    .filter((cabin) => {
      if (!search) {
        return cabin;
      }

      return cabin.name.toLowerCase().includes(search.toLowerCase());
    });

  const displayedCabins = sortedCabins?.slice(firstCabinIndex, lastCabinIndex);

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Name</div>
        <div>Max Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </TableHeader>

      {displayedCabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}

      {displayedCabins.length === 0 && <NoData />}

      <TableFooter>
        <Pagination totalResults={sortedCabins.length} />
      </TableFooter>
    </Table>
  );
};

export default CabinTable;
