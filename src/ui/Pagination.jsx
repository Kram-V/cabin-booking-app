import PropTypes from "prop-types";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import RowsPerPage from "./RowsPerPage";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-grey-900);
    color: var(--color-grey-200);
  }
`;

const rowsPerPageOptions = [
  { title: "10", value: 10 },
  { title: "25", value: 25 },
  { title: "50", value: 50 },
  { title: "100", value: 100 },
];

const Pagination = ({ totalResults }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentRowsPerPage = +searchParams.get("rowsPerPage") || 10;
  const currentPage = +searchParams.get("page") || 1;

  const pageCount = Math.ceil(totalResults / currentRowsPerPage);

  function handleNextPage() {
    const nextPage = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }

  function handlePrevPage() {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        <RowsPerPage options={rowsPerPageOptions} />
      </P>

      <P>
        Showing{" "}
        <span>
          {!totalResults ? 0 : (currentPage - 1) * currentRowsPerPage + 1}
        </span>{" "}
        to{" "}
        <span>
          {!totalResults
            ? 0
            : currentPage === pageCount
            ? totalResults
            : currentPage * currentRowsPerPage}{" "}
        </span>
        of <span>{totalResults}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={handleNextPage}
          disabled={pageCount !== 0 ? currentPage === pageCount : true}
        >
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

Pagination.propTypes = {
  totalResults: PropTypes.number,
};

export default Pagination;
