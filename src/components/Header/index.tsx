import { IImageMetadata } from "@/types/ImageMetadata";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ImagePagination from "@/components/ImagePagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface HeaderProps {
  currentPage: number;
  filteredImages: IImageMetadata[];
  imagesPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleImagesPerPageChange: (n: number) => void;
}

const Header = ({
  currentPage,
  filteredImages,
  imagesPerPage,
  setCurrentPage,
  handleImagesPerPageChange,
}: HeaderProps) => {
  return (
    <div className="sticky top-0 flex self-start items-center h-20 w-auto gap-4 px-5 bg-background">
      <SidebarTrigger size="icon" />
      <div className="mx-auto">
        <ImagePagination
          totalImages={filteredImages.length}
          imagesPerPage={imagesPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="imagesPerPage">Images Per Page</Label>
        <Input
          id="imagesPerPage"
          className="max-w-16"
          type="number"
          value={imagesPerPage}
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
