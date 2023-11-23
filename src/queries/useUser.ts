import { useQuery } from "@tanstack/react-query";
import { API_KEY, API_URL } from "../config";
import { mockUsers } from "../mocks";
import axios from "axios";

const getUsersService = async (params: PaginationOptions) => {
  params;
  const response = await axios.get(`${API_URL}/user/`, {
    params,
    headers: {
      "app-id": API_KEY,
      contentType: "application/json",
    },
  });
  return response.data;
};

export const getUsers = (params: PaginationOptions) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", { ...params }],
    queryFn: () => getUsersService(params),
    select: mockUsers,
  });

  return {
    data,
    isLoading,
    error,
  };
};
