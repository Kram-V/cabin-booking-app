import React from "react";
import BookingDetail from "../features/bookings/BookingDetail";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../services/apiBookings";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

const Booking = () => {
  const { id } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  return <BookingDetail booking={booking} id={+id} />;
};

export default Booking;
