import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import {
  createTestimonial,
  updateTestimonial,
} from "../../services/apiTestimonials";

function TestimonialForm({ testimonial = {}, onCloseModal }) {
  const { id, ...restValues } = testimonial;
  const isEditSession = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? restValues : {},
  });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) =>
      isEditSession ? updateTestimonial(data, id) : createTestimonial(data),
    onSuccess: () => {
      toast.success(
        isEditSession
          ? "Testimonial Successfully Updated"
          : "Testimonial Successfully Added"
      );

      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      });

      reset();
      onCloseModal();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Fullname" error={errors?.fullname?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullname"
          {...register("fullname", { required: "Fullname field is required" })}
        />
      </FormRow>

      <FormRow label="Position" error={errors?.position?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="position"
          {...register("position", {
            required: "Position field is required",
          })}
        />
      </FormRow>

      <FormRow label="Company" error={errors?.company?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="company"
          {...register("company", {
            required: "Company field is required",
          })}
        />
      </FormRow>

      <FormRow label="Comment" error={errors?.comment?.message}>
        <Textarea
          disabled={isLoading}
          type="text"
          id="comment"
          defaultValue=""
          {...register("comment", {
            required: "Comment field is required",
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
          {isEditSession ? "Update Testimonial" : "Add Testimonial"}
        </Button>
      </FormRow>
    </Form>
  );
}

TestimonialForm.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    company: PropTypes.string,
    position: PropTypes.string,
    comment: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};

export default TestimonialForm;
