import CabinForm from "./CabinForm";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";

const EditCabinModal = ({ onClose, cabin }) => {
  return (
    <Modal onClose={onClose}>
      <CabinForm cabin={cabin} onCloseModal={onClose} />
    </Modal>
  );
};

EditCabinModal.propTypes = {
  onClose: PropTypes.func,
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    max_capacity: PropTypes.number,
    regular_price: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default EditCabinModal;
