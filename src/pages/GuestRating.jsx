import Heading from "../ui/Heading";
import Row from "../ui/Row";
import InputSearch from "../ui/InputSearch";
import GuestRatingTable from "../features/guest-ratings/GuestRatingTable";

function GuestRating() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Guest Ratings</Heading>

        <InputSearch placeholder="Search Name" />
      </Row>

      <Row>
        <GuestRatingTable />
      </Row>
    </>
  );
}

export default GuestRating;
