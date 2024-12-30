import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: () => {
      toast.success("Logged In Successfully");

      queryClient.invalidateQueries({
        active: true,
      });

      navigate("/");

      setEmail("");
      setPassword("");
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button onClick={handleSubmit} size="large" disabled={isLoading}>
          Login
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
