import { ReactNode, FC } from "react";
import { Box } from "@chakra-ui/react";

type LayoutProps = {
  children: ReactNode,
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg="gray.100">
      {children}
    </Box>
  );
};

export default Layout;
