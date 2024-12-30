import Modal from "../../ui/Modal";
import PropTypes from "prop-types";
import TestimonialForm from "./TestimonialForm";

const EditTestimonialModal = ({ onClose, testimonial }) => {
  return (
    <Modal onClose={onClose}>
      <TestimonialForm testimonial={testimonial} onCloseModal={onClose} />
    </Modal>
  );
};

EditTestimonialModal.propTypes = {
  onClose: PropTypes.func,
  testimonial: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    company: PropTypes.string,
    position: PropTypes.string,
    comment: PropTypes.string,
  }),
};

export default EditTestimonialModal;
