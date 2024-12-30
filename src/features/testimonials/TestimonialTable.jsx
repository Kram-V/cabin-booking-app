import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import TestimonialRow from "./TestimonialRow";
import { getTestimonials } from "../../services/apiTestimonials";
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
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
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

const TestimonialTable = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const currentPage = searchParams.get("page") || 1;
  const rowsPerPage = searchParams.get("rowsPerPage") || 10;

  const firstTestimonialsIndex = (currentPage - 1) * rowsPerPage;
  const lastTestimonialsIndex = currentPage * rowsPerPage;

  const filteredTestimonials = testimonials?.filter((testimonial) => {
    if (!search) {
      return testimonial;
    }

    return testimonial.fullname.toLowerCase().includes(search.toLowerCase());
  });

  const displayedTestimonials = filteredTestimonials?.slice(
    firstTestimonialsIndex,
    lastTestimonialsIndex
  );

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Name</div>
        <div>Comment</div>
        <div>Position</div>
        <div>Company</div>
        <div>Actions</div>
      </TableHeader>

      {displayedTestimonials.map((testimonial) => (
        <TestimonialRow key={testimonial.id} testimonial={testimonial} />
      ))}

      {displayedTestimonials.length === 0 && <NoData />}

      <TableFooter>
        <Pagination totalResults={filteredTestimonials.length} />
      </TableFooter>
    </Table>
  );
};

export default TestimonialTable;
