import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePaginationContext } from "@/contexts/PaginationContext";
import { ChevronFirst, ChevronLast } from "lucide-react";

const ImagePagination = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { itemCount, itemsPerPage, currentPage, setCurrentPage } =
    usePaginationContext();

  const visiblePages = 4;
  const totalPages = Math.ceil(itemCount / itemsPerPage);
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationPrevious = (currentPage: number) => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const paginationNext = (currentPage: number) => {
    if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
  };
  const handleLastClick = () => {
    setCurrentPage(totalPages);
  };
  const handleFirstClick = () => {
    setCurrentPage(1);
  };

  return (
    <Pagination {...props} className={props.className}>
      <PaginationContent>
        <PaginationItem key="first">
          <PaginationLink size="sm" onClick={handleFirstClick}>
            <ChevronFirst />
            <span className="hidden sm:block"> First</span>
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
                onClick={() => setCurrentPage(number)}
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
            <span className="hidden sm:block">Last </span>
            <ChevronLast />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ImagePagination;
