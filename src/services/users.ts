import { API_KEY, API_URL } from "../config";
import axios from "axios";

export const getUsersService = async () => {
  const [response, response2] = await Promise.all([
    axios.get(`${API_URL}/user/`, {
      params: { limit: 50, page: 0 },
      headers: {
        "app-id": API_KEY,
        contentType: "application/json",
      },
    }),
    axios.get(`${API_URL}/user/`, {
      params: { limit: 50, page: 1 },
      headers: {
        "app-id": API_KEY,
        contentType: "application/json",
      },
    }),
  ]);

  return {
    ...response,
    data: [...response.data.data, ...response2.data.data],
  };
};

export const createUser = async (data: Partial<User>) => {
  const response = await axios.post(`${API_URL}/user/create/`, data, {
    headers: {
      "app-id": API_KEY,
      contentType: "application/json",
    },
  });

  return response.data;
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
