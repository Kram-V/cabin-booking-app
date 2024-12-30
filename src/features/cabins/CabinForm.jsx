import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin, updateCabin } from "../../services/apiCabins";

function CabinForm({ cabin = {}, onCloseModal }) {
  const { id, ...restValues } = cabin;
  const isEditSession = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? restValues : {},
  });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) =>
      isEditSession ? updateCabin(data, id) : createCabin(data),
    onSuccess: () => {
      toast.success(
        isEditSession
          ? "Cabin Successfully Updated"
          : "Cabin Successfully Added"
      );

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      reset();
      onCloseModal();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    mutate({ ...data, image });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="cabinName"
          {...register("name", { required: "Cabin Name field is required" })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.max_capacity?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register("max_capacity", {
            required: "Max Capacity field is required",
            min: {
              value: 1,
              message: "Max Capacity value should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register("regular_price", {
            required: "Regular Price field is required",
            min: {
              value: 1,
              message: "Capacity value should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount field is required",
            validate: (value) =>
              value <= +getValues("regular_price") ||
              "Discount should be less than or equal with regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          disabled={isLoading}
          id="cabinPhoto"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin Photo field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isLoading}
          onClick={onCloseModal}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Update Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CabinForm.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    max_capacity: PropTypes.number,
    regular_price: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};

export default CabinForm;
