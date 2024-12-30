import styled from "styled-components";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import PropTypes from "prop-types";
import { format, isToday } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr 1.5fr 2fr 1fr 1fr 7rem;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const GuestName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Dates = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  display: flex;
  flex-direction: column;

  & span:last-child {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const TotalPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
    font-size: 16px;
    outline: none;
    color: #888282;
  }
`;

function BookingRow({
  booking: {
    id,
    start_date,
    end_date,
    num_nights,
    total_price,
    status,
    guests: { fullname },
    cabins: { name: cabinName, image: cabinImage },
  },
}) {
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
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
        queryKey: ["bookings"],
      });

      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isDeleting, mutate: deleteBookingMutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking Successfully Deleted");

      searchParams.set("page", 1);
      searchParams.set("status", "all");
      searchParams.set("sortBy", "id-desc");

      setSearchParams(searchParams);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      setIsOpenConfirmDeleteModal(false);
    },
    onError: (err) => toast.error(err.message),
  });

  function handleCheckout() {
    mutate(id);
  }

  function handleDeleteBooking() {
    deleteBookingMutate(id);
  }

  return (
    <>
      <TableRow role="row">
        <Img src={cabinImage} />
        <Cabin>{cabinName}</Cabin>
        <GuestName>{fullname}</GuestName>
        <Dates>
          <span>
            {isToday(new Date(start_date))
              ? "Today"
              : formatDistanceFromNow(start_date)}{" "}
            &rarr; {num_nights} night stay
          </span>

          <span>
            {format(new Date(start_date), "MMM dd, yyyy")} &mdash;{" "}
            {format(new Date(end_date), "MMM dd, yyyy")}
          </span>
        </Dates>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        <TotalPrice> {formatCurrency(total_price)}</TotalPrice>

        <ButtonContainer>
          <HiEye id="show" onClick={() => navigate(`/bookings/${id}`)} />

          {status === "unconfirmed" && (
            <HiArrowDownOnSquare
              id="check-in"
              onClick={() => navigate(`/check-in/${id}`)}
            />
          )}

          {status === "checked-in" && (
            <HiArrowUpOnSquare
              id="check-out"
              onClick={handleCheckout}
              disabled={isLoading}
            />
          )}

          <HiTrash
            id="delete"
            disabled={isDeleting}
            onClick={() => setIsOpenConfirmDeleteModal(true)}
          />
        </ButtonContainer>
      </TableRow>

      <Tooltip anchorSelect="#show" place="top">
        Show
      </Tooltip>

      <Tooltip anchorSelect="#check-in" place="top">
        Check In
      </Tooltip>

      <Tooltip anchorSelect="#check-out" place="top">
        Check Out
      </Tooltip>

      <Tooltip anchorSelect="#delete" place="top">
        Delete
      </Tooltip>

      {isOpenConfirmDeleteModal && (
        <ConfirmDelete
          resourceName={name}
          onClose={() => setIsOpenConfirmDeleteModal(false)}
          onConfirm={() => handleDeleteBooking()}
          disabled={isDeleting}
        />
      )}
    </>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    created_at: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    num_nights: PropTypes.number.isRequired,
    num_guests: PropTypes.number.isRequired,
    total_price: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired,
    guests: PropTypes.shape({
      fullname: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingRow;
