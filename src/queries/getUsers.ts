import { useQuery } from "@tanstack/react-query";
import { getUsersService } from "../services/users";
import { mockUsers } from "../mocks";

export const getUsers = (params: QueryOptions, options = {}) =>
  useQuery({
    ...options,
    queryKey: ["usersList"],
    queryFn: () => getUsersService(),
    select: (res: any) => {
      const { data } = mockUsers(res);
      const filteredData = data.filter((user: User) =>
        user.firstName.toLowerCase().includes(params.q.toLowerCase())
      );
      return {
        data: filteredData.slice(
          params.page * params.limit,
          (params.page + 1) * params.limit
        ),
        total: filteredData.length,
      };
    },
  });
