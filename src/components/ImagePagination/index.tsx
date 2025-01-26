import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronFirst, ChevronLast } from "lucide-react";

interface IPaginationParams {
  totalImages: number;
  imagesPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const ImagePagination = ({
  totalImages,
  imagesPerPage,
  currentPage,
  onPageChange,
}: IPaginationParams) => {
  const visiblePages = 4;
  const totalPages = Math.ceil(totalImages / imagesPerPage);
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationPrevious = (currentPage: number) => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const paginationNext = (currentPage: number) => {
    if (currentPage < pageNumbers.length) onPageChange(currentPage + 1);
  };
  const handleLastClick = () => {
    onPageChange(totalPages);
  };
  const handleFirstClick = () => {
    onPageChange(1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="first">
          <PaginationLink size="sm" onClick={handleFirstClick}>
            <ChevronFirst /> First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem key="previous">
          <PaginationPrevious onClick={() => paginationPrevious(currentPage)} />
        </PaginationItem>

        {pageNumbers
          .filter(
            (p) =>
              (p < currentPage + visiblePages && p > 0 && p >= currentPage) ||
              (currentPage > pageNumbers.length - visiblePages &&
                p > pageNumbers.length - visiblePages)
          )
          .map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                isActive={number == currentPage}
                key={number}
                onClick={() => onPageChange(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
        {currentPage < pageNumbers.length - visiblePages + 1 ? (
          <PaginationItem key="Ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <></>
        )}
        <PaginationItem key="next">
          <PaginationNext onClick={() => paginationNext(currentPage)} />
        </PaginationItem>
        <PaginationItem key="last">
          <PaginationLink size="sm" onClick={handleLastClick}>
            Last <ChevronLast />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ImagePagination;
