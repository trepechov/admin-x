import Layout from "./componets/Layout";
import UsersTable from "./componets/UsersTable";
import UserModal from "./componets/UserModal";
import { Button, Box, useDisclosure } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout>
      <Box mb={2}>
        <Button onClick={onOpen} leftIcon={<FaUserPlus />}>
          Create user
        </Button>
      </Box>
      <UsersTable />
      <UserModal isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
}

export default App;
