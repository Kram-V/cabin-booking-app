import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack";
import PropTypes from "prop-types";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking({ booking, settings }) {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
    cabin_price,
  } = booking;

  const { breakfast_price } = settings;

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateBooking(bookingId, data),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      queryClient.invalidateQueries({
        active: true,
      });

      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  const optionalBreakfastPrice = breakfast_price * num_nights * num_guests;

  useEffect(() => {
    setConfirmPaid(booking.is_paid);
  }, [booking.is_paid]);

  function handleCheckin() {
    if (!addBreakfast) return mutate({ status: "checked-in", is_paid: true });

    console.log("HAS BREAKFAST");

    mutate({
      status: "checked-in",
      is_paid: true,
      extra_price: optionalBreakfastPrice,
      has_breakfast: true,
      total_price: cabin_price + optionalBreakfastPrice,
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={(e) => {
              setAddBreakfast(e.target.checked);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={(e) => setConfirmPaid(e.target.checked)}
          disabled={confirmPaid}
          id="confirm"
        >
          I confirm that {guests.fullname} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(total_price)}{" "}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isLoading}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

CheckinBooking.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
    is_paid: PropTypes.bool,
    guests: PropTypes.shape({
      fullname: PropTypes.string,
    }),
    total_price: PropTypes.number,
    num_guests: PropTypes.number,
    has_breakfast: PropTypes.bool,
    num_nights: PropTypes.number,
    cabin_price: PropTypes.number,
  }),
  id: PropTypes.number,
  settings: PropTypes.object,
};

export default CheckinBooking;
