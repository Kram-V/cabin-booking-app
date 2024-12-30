import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import GuestRatingRow from "./GuestRatingRow";
import { getRatings } from "../../services/apiRatings";
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
  grid-template-columns: 80px 1fr 1fr 1fr;
  column-gap: 3.4rem;
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

const GuestRatingTable = () => {
  const [searchParams] = useSearchParams();

  const {
    data: ratings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ratings"],
    queryFn: getRatings,
  });

  const currentPage = searchParams.get("page") || 1;
  const rowsPerPage = searchParams.get("rowsPerPage") || 10;
  const search = searchParams.get("search") || "";

  const firstRatingsIndex = (currentPage - 1) * rowsPerPage;
  const lastRatingsIndex = currentPage * rowsPerPage;

  const filteredRatings = ratings?.filter((rating) => {
    if (!search) {
      return rating;
    }

    return rating.guests.fullname.toLowerCase().includes(search.toLowerCase());
  });

  const displayedRatings = filteredRatings?.slice(
    firstRatingsIndex,
    lastRatingsIndex
  );

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Name</div>
        <div>Comment</div>
        <div>Rating</div>
      </TableHeader>

      {displayedRatings.map((rating) => (
        <GuestRatingRow key={rating.id} guestRating={rating} />
      ))}

      {displayedRatings.length === 0 && <NoData />}

      <TableFooter>
        <Pagination totalResults={filteredRatings.length} />
      </TableFooter>
    </Table>
  );
};

export default GuestRatingTable;
