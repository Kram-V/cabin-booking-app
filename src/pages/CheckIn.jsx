import React from "react";
import CheckinBooking from "../features/check-in-out/CheckinBooking";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../services/apiBookings";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router-dom";
import { getSettings } from "../services/apiSettings";

const CheckIn = () => {
  const { id } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (isLoading || settingsLoading) return <Spinner />;

  return <CheckinBooking booking={booking} settings={settings} />;
};

export default CheckIn;
