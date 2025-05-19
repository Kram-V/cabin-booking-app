import styled, { css } from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import TodayItem from "./TodayItem";
import { PiColumnsPlusLeft } from "react-icons/pi";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  grid-column: 3 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow-y: auto;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 7rem;
`;

function TodayActivity({ todayActivities }) {
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today Activities</Heading>
      </Row>

      <TodayList>
        {todayActivities.map((activity) => (
          <TodayItem key={activity.id} activity={activity} />
        ))}
      </TodayList>

      {!todayActivities.length && (
        <NoActivity style={{ color: "#a19d9d  " }}>
          No Activity Today
        </NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
