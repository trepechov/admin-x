import { useQuery } from "@tanstack/react-query";
import { getUsersService } from "../services/users";
import { mockUsers } from "../mocks";

export const getUsers = (params: PaginationOptions, options = {}) =>
  useQuery({
    ...options,
    queryKey: ["usersList", { ...params }],
    queryFn: () => getUsersService(params),
    select: mockUsers, // Since the mock is missing some fields, we use ReactQuery select to generate them
  });
