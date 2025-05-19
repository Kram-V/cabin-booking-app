import PropTypes from "prop-types";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import { HiPencil, HiSquare2Stack } from "react-icons/hi2";
import EditCabinModal from "./EditCabinModal";
import ConfirmDeleteModal from "../../ui/ConfirmDelete";
import { Tooltip } from "react-tooltip";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
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

const CabinRow = ({ cabin }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);

  const {
    id,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin Successfully Deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      setIsOpenConfirmDeleteModal(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isDuplicating, mutate: createCabinMutate } = useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin Successfully Duplicated");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  function handleDeleteCabin() {
    deleteCabinMutate(id);
  }

  function handleDuplicateCabin() {
    const newData = {
      name,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    };

    createCabinMutate(newData);
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Capacity>Fits up to {max_capacity} guests</Capacity>
        <Price>{formatCurrency(regular_price)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>

        <ButtonContainer>
          {/* <HiSquare2Stack
            id="duplicate"
            disabled={isDuplicating}
            onClick={handleDuplicateCabin}
          /> */}

          <HiPencil id="edit" onClick={() => setIsOpenModal(true)} />

          {/* <HiTrash
            id="delete"
            onClick={() => setIsOpenConfirmDeleteModal(true)}
          /> */}
        </ButtonContainer>
      </TableRow>

      {/* <Tooltip anchorSelect="#duplicate" place="top">
        Duplicate
      </Tooltip> */}

      <Tooltip anchorSelect="#edit" place="top">
        Edit
      </Tooltip>

      {/* <Tooltip anchorSelect="#delete" place="top">
        Delete
      </Tooltip> */}

      {isOpenModal && (
        <EditCabinModal cabin={cabin} onClose={() => setIsOpenModal(false)} />
      )}

      {isOpenConfirmDeleteModal && (
        <ConfirmDeleteModal
          resourceName={name}
          onClose={() => setIsOpenConfirmDeleteModal(false)}
          onConfirm={() => handleDeleteCabin()}
          disabled={isDeleting}
        />
      )}
    </>
  );
};

CabinRow.propTypes = {
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

export default CabinRow;
