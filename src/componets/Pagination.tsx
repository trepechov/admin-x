import { FC } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

type PaginationProps = {
  currentPage: number;
  totalResults: number;
  resultsLimit: number;
  changePageHandler: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalResults,
  resultsLimit,
  changePageHandler,
}) => {
  const totalPages = Math.ceil(totalResults / resultsLimit);
  console.log(totalResults, totalPages, resultsLimit);
  return (
    <ButtonGroup size="sm" variant="outline">
      {Array(totalPages)
        .fill("")
        .map((_, index) => {
          return (
            <Button
              key={index}
              variant={currentPage === index ? "solid" : "outline"}
              onClick={() => changePageHandler(index)}
            >
              {index + 1}
            </Button>
          );
        })}
    </ButtonGroup>
  );
};

export default Pagination;
