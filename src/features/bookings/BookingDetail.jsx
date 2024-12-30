import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";

import { useMoveBack } from "../../hooks/useMoveBack";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail({ booking, id }) {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "red",
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  function handleCheckout() {
    mutate(id);
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/check-in/${id}`)}>Check in</Button>
        )}

        {booking.status === "checked-in" && (
          <Button onClick={handleCheckout} disabled={isLoading}>
            Check out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

BookingDetail.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
  }),
  id: PropTypes.number,
};

export default BookingDetail;
