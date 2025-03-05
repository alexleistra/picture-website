import { IImageMetadata } from "@/types/ImageMetadata";
import TagSidebar from "@/components/TagSidebar";
import ImageGrid from "@/components/ImageGrid";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { PaginationContextProvider } from "@/contexts/PaginationContext";

export interface ITaggedImageBrowserParams {
  images: IImageMetadata[];
}

const TaggedImageBrowser = ({ images }: ITaggedImageBrowserParams) => {
  return (
    <PaginationContextProvider>
      <SidebarProvider>
        <TagSidebar />
        <div className="w-full">
          <Header />

          <div className="mt-4">
            <ImageGrid images={images} />
          </div>
        </div>
      </SidebarProvider>
    </PaginationContextProvider>
  );
};

export default TaggedImageBrowser;
