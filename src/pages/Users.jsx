import { useEffect } from "react";
import SignupForm from "../features/authentication/SignupForm";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import Heading from "../ui/Heading";
import { useNavigate } from "react-router-dom";

function NewUsers() {
  const navigate = useNavigate();
  const { user } = useGetCurrentUser();
  const user_metadata = user?.user_metadata;

  useEffect(() => {
    if (!user_metadata.isAdmin) navigate("/dashboard");
  }, [navigate, user_metadata.isAdmin]);

  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
