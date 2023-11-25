import { FC, useState } from "react";
import { useDeleteUser } from "../mutions/useDeleteUser";
import { QueryClient } from "@tanstack/react-query";
import ModalWrapper from "./ModalWrapper";
import {
  Alert,
  Button,
  Icon,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { RiAlertFill } from "react-icons/ri";

type ModalConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; fullName: string };
};

const ModalConfirm: FC<ModalConfirmProps> = ({ isOpen, onClose, user }) => {
  const [error, setError] = useState("");

  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      // debugger;
      setError("");
      const queryClient = new QueryClient();
      queryClient.invalidateQueries();
      onClose();
    },
    onError: (error: any) => {
      if (error.response.data.error === "RESOURCE_NOT_FOUND") {
        setError("User not found");
      } else {
        setError("Some error occured");
      }
    },
  });

  const handleDelete = () => {
    deleteUser(user.id);
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Delete user">
      <ModalBody>
        {error && (
          <Alert status="error" mb={2} rounded="md">
            <Icon as={RiAlertFill} boxSize={6} mr={2} color="red.600" />
            {error}
          </Alert>
        )}
        <Text>
          Are you sure you want to delete <b>{user.fullName}</b>
        </Text>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="red" mr={3} onClick={handleDelete}>
          Conirm
        </Button>
        <Button variant="ghost" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalWrapper>
  );
};

export default ModalConfirm;
