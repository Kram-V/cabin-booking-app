import PropTypes from "prop-types";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDeleteModal from "../../ui/ConfirmDelete";
import { Tooltip } from "react-tooltip";
import EditTestimonialModal from "./EditTestimonialModal";
import { deleteTestimonial } from "../../services/apiTestimonials";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
  column-gap: 3.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Testimonial = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Position = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Comment = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Company = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
    font-size: 16px;
    outline: none;
    color: #888282;
  }
`;

const TestimonialRow = ({ testimonial }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);

  const { id, fullname, company, position, comment } = testimonial;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTestimonialMutate } =
    useMutation({
      mutationFn: (id) => deleteTestimonial(id),
      onSuccess: () => {
        toast.success("Testimonial Successfully Deleted");

        queryClient.invalidateQueries({
          queryKey: ["testimonials"],
        });
        setIsOpenConfirmDeleteModal(false);
      },
      onError: (err) => toast.error(err.message),
    });

  function handleDeleteTestimonial() {
    deleteTestimonialMutate(id);
  }

  return (
    <>
      <TableRow role="row">
        <Testimonial>{fullname}</Testimonial>
        <Comment>{comment}</Comment>
        <Position>{position}</Position>
        <Company>{company}</Company>

        <ButtonContainer>
          <HiPencil id="edit" onClick={() => setIsOpenModal(true)} />

          <HiTrash
            id="delete"
            onClick={() => setIsOpenConfirmDeleteModal(true)}
          />
        </ButtonContainer>
      </TableRow>

      <Tooltip anchorSelect="#edit" place="top">
        Edit
      </Tooltip>

      <Tooltip anchorSelect="#delete" place="top">
        Delete
      </Tooltip>

      {isOpenModal && (
        <EditTestimonialModal
          testimonial={testimonial}
          onClose={() => setIsOpenModal(false)}
        />
      )}

      {isOpenConfirmDeleteModal && (
        <ConfirmDeleteModal
          resourceName={fullname}
          onClose={() => setIsOpenConfirmDeleteModal(false)}
          onConfirm={() => handleDeleteTestimonial()}
          disabled={isDeleting}
        />
      )}
    </>
  );
};

TestimonialRow.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    company: PropTypes.string,
    position: PropTypes.string,
    comment: PropTypes.string,
  }),
};

export default TestimonialRow;
