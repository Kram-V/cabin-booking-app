import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  // const { updateUser, isUpdating } = useUpdateUser();

  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: (data) => updateCurrentUser(data),
    onSuccess: () => {
      toast.success("Your password updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit({ password }) {
    updateUser({ password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value ||
              "Password and password confirmation don't match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
