import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";
import AddTestimonialsModal from "../features/testimonials/AddTestimonialsModal";
import TestimonialTable from "../features/testimonials/TestimonialTable";
import InputSearch from "../ui/InputSearch";

function Testimonials() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Testimonials</Heading>

        <InputSearch placeholder="Search Name" />

        <Button onClick={() => setIsOpenModal(true)}>
          Add New Testimonial
        </Button>
      </Row>

      <Row>
        <TestimonialTable />

        {isOpenModal && (
          <AddTestimonialsModal onClose={() => setIsOpenModal(false)} />
        )}
      </Row>
    </>
  );
}

export default Testimonials;
