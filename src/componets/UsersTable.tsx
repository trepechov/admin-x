import {
  Avatar,
  Card,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { getUsers } from "../queries/getUsers";
import ModalDelete from "./ModalDelete";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import { Button } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import ModalUser from "./ModalUser";

const UsersTable: FC = () => {
  const [queryParams, setQueryParams] = useState({ page: 0, limit: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isUserOpen,
    onOpen: onUserOpen,
    onClose: onUserClose,
  } = useDisclosure();

  const { data: users, isLoading } = getUsers(queryParams, {
    onSuccess: (data: UsersResponse) => {
      //if result is empty array navigate the last possible page
      //usualy when deleting the last user of the page
      if (data.data.length === 0) {
        setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }));
      }
    },
  });
  const [deleteUser, setDeleteUser] = useState({ id: "", fullName: "" });

  const handleDelete = (id: string, fullName: string) => {
    setDeleteUser({ id, fullName });
    onDeleteOpen();
  };

  const changePageHandler = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card p="4">
      <Flex mb={2} justifyContent="space-between">
        <InputGroup w="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={GoSearch} color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Filter" onChange={handleSearch} />
        </InputGroup>
        <Button
          variant="solid"
          colorScheme="green"
          onClick={onUserOpen}
          leftIcon={<FaUserPlus />}
        >
          Create user
        </Button>
      </Flex>
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
              {users?.data
                .filter(
                  (user: User) =>
                    user.fullName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    user.phoneNumber.includes(searchQuery)
                )
                .map((user: User) => (
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
                        onClick={() => handleDelete(user.id, user.fullName)}
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
      <ModalDelete
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        user={deleteUser}
      />
      <ModalUser isOpen={isUserOpen} onClose={onUserClose} />
    </Card>
  );
};

export default UsersTable;
