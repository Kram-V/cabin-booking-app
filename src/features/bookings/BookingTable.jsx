import styled from "styled-components";
import BookingRow from "./BookingRow";
import { getBookings } from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
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
  grid-template-columns: 0.6fr 1fr 1.5fr 2fr 1fr 1fr 7rem;
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

function BookingTable() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filteredValue = searchParams.get("status") || "all";
  const sortedValue = searchParams.get("sortBy") || "id-desc";
  const page = +searchParams.get("page") || 1;
  const rowsPerPage = searchParams.get("rowsPerPage") || 10;

  const search = searchParams.get("search") || "";

  const filter =
    filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue, method: "eq" };

  const [field, order] = sortedValue.split("-");

  const sortBy = { field, order, method: "order" };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "bookings",
      filteredValue,
      sortedValue,
      page,
      search,
      rowsPerPage,
    ],
    queryFn: () => getBookings({ filter, sortBy, page, rowsPerPage, search }),
  });

  const bookings = data?.data || [];
  const count = data?.count;

  const pageCount = Math.ceil(count / rowsPerPage);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filteredValue,
        sortedValue,
        page + 1,
        rowsPerPage,
        search,
      ],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filteredValue,
        sortedValue,
        page - 1,
        rowsPerPage,
        search,
      ],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Table>
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div>Actions</div>
      </TableHeader>

      {bookings.map((booking) => (
        <BookingRow key={booking.id} booking={booking} />
      ))}

      {bookings.length === 0 && <NoData />}

      <TableFooter>
        <Pagination totalResults={count} />
      </TableFooter>
    </Table>
  );
}

export default BookingTable;
