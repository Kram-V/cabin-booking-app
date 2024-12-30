import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineUsers,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineChat } from "react-icons/hi";

function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
  unconfirmedBookings,
  guests,
  testimonials,
  ratings,
}) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);

  const checkins = confirmedStays.length;
  const totalUnconfirmedBookings = unconfirmedBookings.length;
  const totalTestimonials = testimonials.length;
  const totalGuests = guests.length;

  const ratingsLength = ratings.length;
  const averageRatings =
    ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratingsLength;
  const totalPercentage = Math.round((averageRatings / 5) * 100) || 0;

  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.num_nights, 0) /
      (numDays * cabinCount) || 0;
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Checked ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />

      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />

      <Stat
        title="Unconfirmed (Overall)"
        color="cyan"
        icon={<HiOutlineClock />}
        value={totalUnconfirmedBookings}
      />

      <Stat
        title="Guest Ratings (Overall)"
        color="yellow"
        icon={<HiOutlineStar />}
        value={totalPercentage + "%"}
      />

      <Stat
        title="Guests (Overall)"
        color="teal"
        icon={<HiOutlineUsers />}
        value={totalGuests}
      />

      <Stat
        title="Testimonials (Overall)"
        color="pink"
        icon={<HiOutlineChat />}
        value={totalTestimonials}
      />
    </>
  );
}

export default Stats;
