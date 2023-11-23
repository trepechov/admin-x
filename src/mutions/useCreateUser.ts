import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/users";

export const useCreateUser = (options = {}) =>
  useMutation({
    mutationFn: createUser,
    ...options,
  });

//TODO check optimiisttiic update
// const queryClient = useQueryClient();

// return useMutation({
//   mutationFn: () => createUser(data),
//   // When mutate is called:
//   onMutate: async (newUser) => {
//     // Cancel any outgoing refetches
//     // (so they don't overwrite our optimistic update)
//     await queryClient.cancelQueries({ queryKey: ["users"] });

//     // Snapshot the previous value
//     const prevUsers = queryClient.getQueryData(["users"]);

//     // Optimistically update to the new value
//     queryClient.setQueryData(["users"], (oldUsers: UsersResponse) => ({
//       ...oldUsers,
//       data: [...oldUsers.data, newUser],
//     }));

//     // Return a context object with the snapshotted value
//     return { prevUsers };
//   },
//   // If the mutation fails,
//   // use the context returned from onMutate to roll back
//   onError: (err, newUser, context) => {
//     queryClient.setQueryData(["todos"], context?.prevUsers);
//   },
//   // Always refetch after error or success:
//   onSettled: () => {
//     queryClient.invalidateQueries({ queryKey: ["users"] });
//   },
// });
