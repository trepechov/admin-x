import { FC, useState } from "react";
import { getUsers } from "../queries/useUser";
import {
  Avatar,
  Card,
  HStack,
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

const UsersTable: FC = () => {
  const [queryProps, setQueryProps] = useState({ page: 1, limit: 10 });
  const { data: users, isLoading, error } = getUsers(queryProps);

  console.log(users);

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
            </Tr>
          </Thead>
          {isLoading ? (
            <TableSkeleton colSpan={3} />
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
                </Tr>
              ))}
            </Tbody>
          )}
          <Tfoot>
            <Tr>
              <Th colSpan={3} textAlign="center">
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
