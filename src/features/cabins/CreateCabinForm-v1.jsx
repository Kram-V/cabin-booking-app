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

import { createCabin } from "../../services/apiCabins";

function CreateCabinForm({ setShowForm }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin Successfully Added");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      setShowForm(false);
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          disabled={isAdding}
          type="text"
          id="cabinName"
          {...register("name", { required: "Name field is required" })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.max_capacity?.message}>
        <Input
          disabled={isAdding}
          type="number"
          id="maxCapacity"
          {...register("max_capacity", {
            required: "Capacity field is required",
            min: {
              value: 1,
              message: "Capacity value should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          disabled={isAdding}
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
          disabled={isAdding}
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
          disabled={isAdding}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          disabled={isAdding}
          id="cabinPhoto"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isAdding}
          onClick={() => setShowForm(false)}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isAdding}>
          {isAdding ? "Addin Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  setShowForm: PropTypes.func,
};

export default CreateCabinForm;
