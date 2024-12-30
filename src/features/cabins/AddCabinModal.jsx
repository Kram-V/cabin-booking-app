import CabinForm from "./CabinForm";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";

const AddCabinModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <CabinForm onCloseModal={onClose} />
    </Modal>
  );
};

AddCabinModal.propTypes = {
  onClose: PropTypes.func,
};

export default AddCabinModal;
