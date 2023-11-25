import { FC, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useCreateUser } from "../mutions/useCreateUser";
import ModalWrapper from "./ModalWrapper";
import { QueryClient } from "@tanstack/react-query";

type ModalUserProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalUser: FC<ModalUserProps> = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const { mutate: createUser } = useCreateUser({
    onError: (error: any) => {
      console.log("error", error);
      setError(error.message);
    },
    onSuccess: () => {
      // debugger;
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    createUser(userData);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Create User">
      <form onSubmit={handleSubmit}>
        <ModalBody pb={6}>
          {error && <Text color="red.500">{error}</Text>}
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>title</FormLabel>
            <Input name="title" placeholder="Title" onChange={handleChange} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" placeholder="Email" onChange={handleChange} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Phone</FormLabel>
            <Input name="phone" placeholder="Phone" onChange={handleChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="green" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </form>
    </ModalWrapper>
  );
};

export default ModalUser;
