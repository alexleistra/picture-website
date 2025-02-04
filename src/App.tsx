import { useEffect, useState } from "react";
import "./App.css";
import { IImageMetadata } from "./types/ImageMetadata";
import TagSidebar from "@/components/TagSidebar";
import ImageGrid from "@/components/ImageGrid";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { PaginationContext } from "@/contexts/PaginationContext";

function App() {
  const [images, setImages] = useState<IImageMetadata[]>([]);
  const [filteredImages, setFilteredImages] = useState<IImageMetadata[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(16);

  useEffect(() => {
    // read JSON file and initialize state
    fetch(`${import.meta.env.VITE_IMAGE_PATH}/image_tags.json`).then(
      async (res: Response) => {
        if (res.ok) {
          const data = (await res.json()) as IImageMetadata[];
          setImages(data);
          setFilteredImages(data);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (selectedTags) {
      setFilteredImages(
        images.filter((image) => {
          const selectedTagsSet = new Set(selectedTags);
          return image.tags.some((item) => selectedTagsSet.has(item));
        })
      );
    } else {
      setFilteredImages(images);
    }
  }, [selectedTags, images]);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );
  const handleSelectedTagsChange = (tags: string[]) => {
    setCurrentPage(1);
    setSelectedTags(tags);
  };
  const handleImagesPerPageChange = (n: number) => {
    setCurrentPage(1);
    setImagesPerPage(n);
  };

  return (
    <PaginationContext.Provider
      value={{ currentPage, imagesPerPage, filteredImages, setCurrentPage }}
    >
      <SidebarProvider>
        <TagSidebar tags={tags} setCurrentTags={handleSelectedTagsChange} />
        <div className="w-full">
          <Header handleImagesPerPageChange={handleImagesPerPageChange} />

          <div className="mt-24">
            <ImageGrid images={currentImages} />
          </div>
        </div>
      </SidebarProvider>
    </PaginationContext.Provider>
  );
}

export default App;
