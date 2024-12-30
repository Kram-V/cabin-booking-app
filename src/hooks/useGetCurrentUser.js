import { useQuery } from "@tanstack/react-query";
import { getCurrentUserDetails } from "../services/apiAuth";

export function useGetCurrentUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserDetails,
  });

  return {
    isLoading,
    user,
  };
}
