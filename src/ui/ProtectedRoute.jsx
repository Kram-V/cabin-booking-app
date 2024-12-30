import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCurrentUserDetails } from "../services/apiAuth";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  const { isLoading, user } = useGetCurrentUser();
  const navigate = useNavigate();

  const isAuthenticated = user?.role === "authenticated";

  // if (isLoading)
  //   return (
  //     <FullPage>
  //       <Spinner />
  //     </FullPage>
  //   );

  if (!isAuthenticated) return navigate("/login");

  return children;
};

export default ProtectedRoute;
