import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.success("You have logged out successfully");

      queryClient.removeQueries();

      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <ButtonIcon disabled={isLoading} onClick={() => mutate()}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
