import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  function paginationPrevious(currentPage: number) {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }
  function paginationNext(currentPage: number) {
    if (currentPage < pageNumbers.length) onPageChange(currentPage + 1);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => paginationPrevious(currentPage)} />
        </PaginationItem>

        {pageNumbers
          .filter(
            (p) =>
              (p < currentPage + 4 && p > 0 && p >= currentPage) ||
              (currentPage > pageNumbers.length - 4 &&
                p > pageNumbers.length - 4)
          )
          .map((number) => (
            <PaginationItem>
              <PaginationLink
                isActive={number == currentPage}
                key={number}
                onClick={() => onPageChange(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
        {/* {currentPage < pageNumbers.length - 2 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <></>
        )} */}
        <PaginationItem>
          <PaginationNext onClick={() => paginationNext(currentPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ImagePagination;
