import { useQuery } from "@tanstack/react-query";
import { mockUsers } from "../mocks";
import { getUsersService } from "../services/users";

export const getUsers = (params: PaginationOptions) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", { ...params }],
    queryFn: () => getUsersService(params),
    select: mockUsers,
    staleTime: 1000 * 60, // 60 seconds
  });

  return {
    data,
    isLoading,
    error,
  };
};
