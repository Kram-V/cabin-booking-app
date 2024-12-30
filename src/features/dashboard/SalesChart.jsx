import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
`;

const SalesChart = ({ bookings, numDays }) => {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: `${format(date, "MMM dd")}`,
      total_sales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, cur) => acc + cur.total_price, 0),

      extra_sales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, cur) => acc + cur.extra_price, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM. dd, yyyy")} to{" "}
        {format(allDates.at(-1), "MMM. dd, yyyy")} (in Peso)
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total_sales"
            stroke="#10b981"
            fill="#10b981"
            name="Total Sales"
          />

          <Area
            type="monotone"
            dataKey="extra_sales"
            stroke="#3b82f6"
            fill="#3b82f6"
            name="Extra Sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
