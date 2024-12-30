import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
  getStaysTodayActivity,
  getUnconfirmedBookings,
} from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./stats";
import { getCabins } from "../../services/apiCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { getTestimonials } from "../../services/apiTestimonials";
import { getGuests } from "../../services/apiGuests";
import { getRatings } from "../../services/apiRatings";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto 34rem;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const [searchParams] = useSearchParams();

  const numDays = +searchParams.get("last") || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: bookingsLoading, data: bookings } = useQuery({
    queryKey: ["after-bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  const { isLoading: recentStaysLoading, data: recentStays } = useQuery({
    queryKey: ["stay-bookings", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const { data: todayActivities, isLoading: todayLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  const { data: cabins, isLoading: cabinsLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const { data: ratings, isLoading: ratingsLoading } = useQuery({
    queryKey: ["ratings"],
    queryFn: getRatings,
  });

  const { data: unconfirmedBookings, isLoading: unconfirmedBookingsLoading } =
    useQuery({
      queryKey: ["unconfirmedBookings"],
      queryFn: getUnconfirmedBookings,
    });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const { data: guests, isLoading: guestsLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status !== "unconfirmed"
  );

  if (
    bookingsLoading ||
    recentStaysLoading ||
    cabinsLoading ||
    todayLoading ||
    unconfirmedBookingsLoading ||
    testimonialsLoading ||
    guestsLoading ||
    ratingsLoading
  )
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        unconfirmedBookings={unconfirmedBookings}
        testimonials={testimonials}
        guests={guests}
        ratings={ratings}
        cabinCount={cabins.length}
      />

      <DurationChart confirmedStays={confirmedStays} />
      <TodayActivity todayActivities={todayActivities} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
