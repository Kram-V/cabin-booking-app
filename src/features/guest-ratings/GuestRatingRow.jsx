import PropTypes from "prop-types";
import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr;
  column-gap: 3.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Name = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Comment = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Rating = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const GuestRatingRow = ({ guestRating }) => {
  const {
    guests: { fullname },
    comment,
    rating,
  } = guestRating;

  return (
    <>
      <TableRow role="row">
        <div></div>
        <Name>{fullname}</Name>
        <Comment>{comment}</Comment>
        <Rating>
          {rating === 0 || rating === 1 ? `${rating} star` : `${rating} stars`}
        </Rating>
      </TableRow>
    </>
  );
};

GuestRatingRow.propTypes = {
  guestRating: PropTypes.shape({
    guests: PropTypes.shape({
      fullname: PropTypes.string,
    }),
    rating: PropTypes.number,
    comment: PropTypes.string,
  }),
};

export default GuestRatingRow;
