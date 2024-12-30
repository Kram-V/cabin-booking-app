import TestimonialForm from "./TestimonialForm";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";

const AddTestimonialsModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <TestimonialForm onCloseModal={onClose} />
    </Modal>
  );
};

AddTestimonialsModal.propTypes = {
  onClose: PropTypes.func,
};

export default AddTestimonialsModal;
