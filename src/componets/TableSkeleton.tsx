import { Skeleton, Tbody, Tr, Td, VStack } from "@chakra-ui/react";
import { FC } from "react";

type TableSkeletonProps = {
  colSpan: number;
};

const TableSkeleton: FC<TableSkeletonProps> = ({ colSpan }) => (
  <Tbody>
    <Tr>
      <Td m={0} p={0} colSpan={colSpan}>
        <VStack>
          {Array(3)
            .fill("")
            .map((_, i) => (
              <Skeleton w="full" height={14} key={i} />
            ))}
        </VStack>
      </Td>
    </Tr>
  </Tbody>
);

export default TableSkeleton;
