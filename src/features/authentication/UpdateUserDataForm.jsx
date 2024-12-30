import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { username: currentUsername },
    },
  } = useGetCurrentUser();

  const [username, setUsername] = useState(currentUsername);
  const [avatar, setAvatar] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => updateCurrentUser(data),
    onSuccess: () => {
      toast.success("Your account details updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;

    mutate(
      { username, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Username">
        <Input
          disabled={isLoading}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
      </FormRow>
      <FormRow label="Profile image">
        <FileInput
          disabled={isLoading}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isLoading}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
