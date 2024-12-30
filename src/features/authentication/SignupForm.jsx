import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp } from "../../services/apiAuth";
import Checkbox from "../../ui/Checkbox";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: () => {
      toast.success(
        "Account created successfully. Please verify the new account from the user's email address"
      );

      queryClient.invalidateQueries({
        active: true,
      });

      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit({ username, email, password, isAdmin }) {
    mutate({ username, email, password, isAdmin });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Username" error={errors?.username?.message}>
        <Input
          disabled={isLoading}
          autoComplete="on"
          type="text"
          id="username"
          {...register("username", { required: "Username field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          autoComplete="on"
          type="email"
          id="email"
          {...register("email", {
            required: "Email field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading}
          autoComplete="on"
          type="password"
          id="password"
          {...register("password", {
            required: "Password field is required",
            minLength: {
              value: 8,
              message: "Password needs a greater than of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.password_confirm?.message}
      >
        <Input
          disabled={isLoading}
          autoComplete="on"
          type="password"
          id="password_confirm"
          {...register("password_confirm", {
            required: "Password confirmation field is required",
            validate: (value) =>
              value === getValues("password") ||
              "Password and password confirmation don't match",
          })}
        />
      </FormRow>

      <FormRow label="Is Admin">
        <Checkbox
          register={{
            ...register("isAdmin"),
          }}
          id="confirm"
        >
          Is Admin
        </Checkbox>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {/* <Button variation="secondary" type="reset">
          Cancel
        </Button> */}
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
