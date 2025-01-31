import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationContext } from "@/contexts/paginationContext";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { useContext } from "react";

const ImagePagination = () => {
  const pagination = useContext(PaginationContext);

  const visiblePages = 4;
  const totalPages = Math.ceil(
    pagination.filteredImages.length / pagination.imagesPerPage
  );
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationPrevious = (currentPage: number) => {
    if (currentPage > 1) pagination.setCurrentPage(currentPage - 1);
  };
  const paginationNext = (currentPage: number) => {
    if (currentPage < pageNumbers.length)
      pagination.setCurrentPage(currentPage + 1);
  };
  const handleLastClick = () => {
    pagination.setCurrentPage(totalPages);
  };
  const handleFirstClick = () => {
    pagination.setCurrentPage(1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="first">
          <PaginationLink size="sm" onClick={handleFirstClick}>
            <ChevronFirst />
            <span className="hidden sm:block"> First</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem key="previous">
          <PaginationPrevious
            onClick={() => paginationPrevious(pagination.currentPage)}
          />
        </PaginationItem>

        {pageNumbers
          .filter(
            (p) =>
              (p < pagination.currentPage + visiblePages &&
                p > 0 &&
                p >= pagination.currentPage) ||
              (pagination.currentPage > pageNumbers.length - visiblePages &&
                p > pageNumbers.length - visiblePages)
          )
          .map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                isActive={number == pagination.currentPage}
                key={number}
                onClick={() => pagination.setCurrentPage(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
        {pagination.currentPage < pageNumbers.length - visiblePages + 1 ? (
          <PaginationItem key="Ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <></>
        )}
        <PaginationItem key="next">
          <PaginationNext
            onClick={() => paginationNext(pagination.currentPage)}
          />
        </PaginationItem>
        <PaginationItem key="last">
          <PaginationLink size="sm" onClick={handleLastClick}>
            <span className="hidden sm:block">Last </span>
            <ChevronLast />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ImagePagination;
