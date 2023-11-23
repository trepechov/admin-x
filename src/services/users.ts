import { API_KEY, API_URL } from "../config";
import axios from "axios";

export const getUsersService = async (params: PaginationOptions) => {
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

export const createUser = async (data: Partial<User>) => {
  try {
    const response = await axios.post(`${API_URL}/user/create/`, data, {
      headers: {
        "app-id": API_KEY,
        contentType: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.log();
    throw new Error(error.response.data.error);
  }
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${API_URL}/user/${userId}`, {
    headers: {
      "app-id": API_KEY,
      contentType: "application/json",
    },
  });
  return response.data;
};
