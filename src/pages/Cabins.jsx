import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabinModal from "../features/cabins/AddCabinModal";
import Button from "../ui/Button";
import { useState } from "react";
import CabinTableOperations from "./CabinTableOperations";

function Cabins() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
        <Button onClick={() => setIsOpenModal(true)}>Add New Cabin</Button>
      </Row>

      <Row>
        <CabinTable />

        {isOpenModal && <AddCabinModal onClose={() => setIsOpenModal(false)} />}
      </Row>
    </>
  );
}

export default Cabins;
