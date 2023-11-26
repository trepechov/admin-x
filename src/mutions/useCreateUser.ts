import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/users";

export const useCreateUser = (options = {}) =>
  useMutation({
    ...options,
    mutationFn: createUser,
  });