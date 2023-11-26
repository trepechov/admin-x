import { FC, useState } from "react";
import { useDeleteUser } from "../mutions/useDeleteUser";
import { useQueryClient } from "@tanstack/react-query";
import ModalWrapper from "./ModalWrapper";
import {
  Alert,
  Button,
  Icon,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react";
import { RiAlertFill } from "react-icons/ri";

type ModalDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; fullName: string };
};

const ModalDelete: FC<ModalDeleteProps> = ({ isOpen, onClose, user }) => {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      onClose();
      toast({
        title: "User deleted",
        description: "User was deleted successfully",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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

export default ModalDelete;
