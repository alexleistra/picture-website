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
import { DEFAULT_VISIBLE_PAGES } from "@/lib/constants";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ImagePagination = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { itemCount, itemsPerPage, currentPage, setCurrentPage } =
    usePaginationContext();

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
          <PaginationLink
            aria-label="Go to first page"
            size="default"
            onClick={handleFirstClick}
          >
            <ChevronFirst />
            <span className="hidden sm:block"> First</span>
          </PaginationLink>
        </PaginationItem>

        <PaginationItem key="previous">
          <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className="gap-1 pl-2.5"
            onClick={() => paginationPrevious(currentPage)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:block">Previous</span>
          </PaginationLink>
        </PaginationItem>

        {pageNumbers
          .filter(
            (p) =>
              (p < currentPage + DEFAULT_VISIBLE_PAGES &&
                p > 0 &&
                p >= currentPage) ||
              (currentPage > pageNumbers.length - DEFAULT_VISIBLE_PAGES &&
                p > pageNumbers.length - DEFAULT_VISIBLE_PAGES - 1)
          )
          .map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                aria-label={`Go to page ${number}`}
                isActive={number == currentPage}
                key={number}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
        {currentPage < pageNumbers.length - DEFAULT_VISIBLE_PAGES + 1 ? (
          <PaginationItem key="Ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <></>
        )}

        <PaginationItem key="next">
          <PaginationLink
            aria-label="Go to next page"
            size="default"
            className="gap-1 pr-2.5"
            onClick={() => paginationNext(currentPage)}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem key="last">
          <PaginationLink
            aria-label="Go to last page"
            size="default"
            onClick={handleLastClick}
          >
            <span className="hidden sm:block">Last </span>
            <ChevronLast />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ImagePagination;
