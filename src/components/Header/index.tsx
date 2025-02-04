import { SidebarTrigger } from "@/components/ui/sidebar";
import ImagePagination from "@/components/ImagePagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { PaginationContext } from "@/contexts/PaginationContext";

export interface HeaderProps {
  handleImagesPerPageChange: (n: number) => void;
}

const Header = ({ handleImagesPerPageChange }: HeaderProps) => {
  const pagination = useContext(PaginationContext);

  return (
    <div className="sticky top-0 flex self-start items-center h-20 w-auto gap-4 px-5 bg-background">
      <SidebarTrigger size="icon" />
      <div className="mx-auto">
        <ImagePagination />
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="imagesPerPage">Images Per Page</Label>
        <Input
          id="imagesPerPage"
          className="max-w-16"
          type="number"
          value={pagination.imagesPerPage}
          max={24}
          min={8}
          onChange={(e) => {
            handleImagesPerPageChange(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default Header;
