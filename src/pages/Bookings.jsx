import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import InputSearch from "../ui/InputSearch";
import Row from "../ui/Row";
import BookingTableOperations from "./BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
        <InputSearch placeholder="Search Cabin" />
      </Row>

      <Row>
        <BookingTable />

        {/* <Button onClick={() => setIsOpenModal(true)}>Add New Cabin</Button>

        {isOpenModal && <AddCabinModal onClose={() => setIsOpenModal(false)} />} */}
      </Row>
    </>
  );
}

export default Bookings;
