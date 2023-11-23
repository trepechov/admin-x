import { ReactNode, FC } from "react";
import { Container, Flex } from "@chakra-ui/react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" minHeight="100vh" bg="gray.50">
      <Container maxW="container.xl" p={8}>
        {children}
      </Container>
    </Flex>
  );
};

export default Layout;
