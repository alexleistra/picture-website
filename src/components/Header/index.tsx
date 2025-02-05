import { SidebarTrigger } from "@/components/ui/sidebar";
import ImagePagination from "@/components/ImagePagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePaginationContext } from "@/contexts/PaginationContext";

const Header = () => {
  const { itemsPerPage, setItemsPerPage, setCurrentPage } =
    usePaginationContext();

  return (
    <div className="sticky top-0 flex justify-between flex-wrap self-start sm:items-center h-20 w-auto gap-4 px-5 bg-background">
      <div className="order-1 p-3">
        <SidebarTrigger size="icon" />
      </div>
      <div className="order-3 lg:order-2 w-full lg:w-auto mx-auto">
        <ImagePagination />
      </div>
      <div className="order-2 lg:order-3 items-center gap-3">
        <Label htmlFor="imagesPerPage">Images Per Page</Label>
        <Input
          id="imagesPerPage"
          className="max-w-16"
          type="number"
          value={itemsPerPage}
          max={24}
          min={8}
          onChange={(e) => {
            setCurrentPage(1);
            setItemsPerPage(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default Header;
