import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../services/users";

export const useDeleteUser = (options = {}) =>
  useMutation({
    ...options,
    mutationFn: (id: string) => deleteUser(id),
  });
