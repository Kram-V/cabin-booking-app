import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import PropTypes from "prop-types";
import Modal from "./Modal";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, onClose, disabled }) {
  return (
    <Modal onClose={onClose}>
      <StyledConfirmDelete>
        <Heading as="h3">Delete {resourceName}</Heading>
        <p>
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>

        <div>
          <Button variation="secondary" onClick={onClose} disabled={disabled}>
            Cancel
          </Button>
          <Button variation="danger" onClick={onConfirm} disabled={disabled}>
            Delete
          </Button>
        </div>
      </StyledConfirmDelete>
    </Modal>
  );
}

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ConfirmDelete;
