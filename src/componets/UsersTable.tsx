import { FC, useState } from "react";
import { getUsers } from "../queries/getUsers";
import {
  Avatar,
  Card,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteUser } from "../mutions/useDeleteUser";
import { QueryClient } from "@tanstack/react-query";

const UsersTable: FC = () => {
  const [queryProps, setQueryProps] = useState({ page: 0, limit: 10 });
  const { data: users, isLoading } = getUsers(queryProps);
  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      debugger;
      const queryClient = new QueryClient();
      queryClient.invalidateQueries();
    },
  });

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  const changePageHandler = (page: number) => {
    setQueryProps((prev) => ({ ...prev, page }));
  };

  return (
    <Card p="4">
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {isLoading ? (
            <TableSkeleton colSpan={4} />
          ) : (
            <Tbody>
              {users?.data.map((user: User) => (
                <Tr key={user.id}>
                  <Td>
                    <HStack>
                      <Avatar
                        shadow="md"
                        name={user.fullName}
                        src={user.picture}
                      />
                      <Text>{user.fullName}</Text>
                    </HStack>
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td>
                    <IconButton
                      size="sm"
                      bg="red.500"
                      color="white"
                      _hover={{ bg: "red.600" }}
                      borderRadius="full"
                      aria-label="Delete user"
                      icon={<MdDeleteOutline />}
                      onClick={() => handleDelete(user.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
          <Tfoot>
            <Tr>
              <Th colSpan={4} textAlign="center">
                {users?.data && (
                  <Pagination
                    totalResults={users?.total}
                    currentPage={users.page}
                    resultsLimit={users.limit}
                    changePageHandler={changePageHandler}
                  />
                )}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UsersTable;
