import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;

  & > *:first-child {
    margin-bottom: -10px;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const NoDurationSummary = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 13rem;
`;

const startData = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "More than 21 nights",
    value: 0,
    color: "#a855f7",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.num_nights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

const DurationChart = ({ confirmedStays }) => {
  const [currentValue, setCurrentValue] = useState("");

  const data = prepareData(startData, confirmedStays);

  const handleMouseEnter = (o) => {
    const { value } = o;

    setCurrentValue(value);
  };

  const handleMouseLeave = () => {
    setCurrentValue("");
  };

  console.log("DURATION CHART: ", data);

  return (
    <ChartBox>
      <Heading as="h2">Stay Duration Summary</Heading>
      {data.length > 0 ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.duration === currentValue
                      ? `rgba(${hexToRgb(entry.color)}, 0.5)`
                      : `rgba(${hexToRgb(entry.color)}, 1)`
                  }
                />
              ))}
            </Pie>

            <Legend
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <NoDurationSummary style={{ color: "#a19d9d  " }}>
          No Stay Duration
        </NoDurationSummary>
      )}
    </ChartBox>
  );
};

export default DurationChart;
