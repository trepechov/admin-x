import { FC, ReactNode } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const ModalWrapper: FC<UserModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
