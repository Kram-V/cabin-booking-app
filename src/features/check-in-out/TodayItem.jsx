import styled from "styled-components";
import Tag from "../../ui/Tag";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;

  & div {
    display: flex;
    flex-direction: column;

    &:last-child span:last-child {
      font-size: 12px;
      color: #b9b5b5;
    }
  }
`;

const TodayItem = ({ activity }) => {
  const { id, status, guests, num_nights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Guest>
        <div>
          <span>{guests.fullname}</span>
          <span>{num_nights} nights</span>
        </div>
      </Guest>

      <div style={{ fontSize: "13px", color: "#a19d9d" }}>
        {guests.nationality}
      </div>
    </StyledTodayItem>
  );
};

export default TodayItem;
