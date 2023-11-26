import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCreateUser } from "../mutions/useCreateUser";
import ModalWrapper from "./ModalWrapper";
import {
  Alert,
  Button,
  Icon,
  ModalBody,
  ModalFooter,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { RiAlertFill } from "react-icons/ri";
import FormControlInput from "./FormControlnput";
import { useQueryClient } from "@tanstack/react-query";

type ModalUserProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalUser: FC<ModalUserProps> = ({ isOpen, onClose }) => {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutate: createUser } = useCreateUser({
    onError: (error: any) => {
      if (error.response.data.data) {
        Object.keys(error.response.data.data).forEach((key: string) => {
          setError(key, {
            type: "manual",
            message: error.response.data.data[key],
          });
        });
      } else {
        setFormError("Some error occured");
      }
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["usersList"],
      });
      reset();
      onClose();
      toast({
        title: "User created.",
        description: `We've created ${data.firstName} ${data.lastName}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Create User">
      <form onSubmit={handleSubmit(createUser as SubmitHandler<FieldValues>)}>
        <ModalBody pb={6}>
          <VStack spacing={4}>
            {formError && (
              <Alert status="error" rounded="md">
                <Icon as={RiAlertFill} boxSize={6} mr={2} color="red.600" />
                {formError}
              </Alert>
            )}

            <FormControlInput
              name="firstName"
              label="First name"
              errors={errors}
              register={register}
              validation={{
                required: { value: true, message: "Enter first name" },
              }}
            />

            <FormControlInput
              name="lastName"
              label="Last name"
              errors={errors}
              register={register}
              validation={{
                required: { value: true, message: "Enter last name" },
              }}
            />

            <FormControlInput
              name="email"
              label="Email"
              errors={errors}
              register={register}
              validation={{
                required: { value: true, message: "Enter email" },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter valid email address",
                },
              }}
            />

            <FormControlInput
              name="phone"
              label="Phone Number"
              errors={errors}
              register={register}
              validation={{
                required: { value: true, message: "Enter phone number" },
                pattern: {
                  value: /^[\d\-\s]{8,12}$/,
                  message: "Enter valid phone number",
                },
              }}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="green" mr={2}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </form>
    </ModalWrapper>
  );
};

export default ModalUser;
