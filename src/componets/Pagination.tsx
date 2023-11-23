import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsLimit: number;
  changePageHandler: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  resultsLimit,
  changePageHandler,
}) => {
  const totalPages = Math.ceil(totalResults / resultsLimit);
  return (
    <ButtonGroup size="sm" variant="outline">
      {Array(totalPages)
        .fill("")
        .map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Button
              key={index}
              variant={currentPage === pageNumber ? "solid" : "outline"}
              onClick={() => changePageHandler(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
    </ButtonGroup>
  );
};

export default Pagination;
