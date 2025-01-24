import { useEffect, useState } from "react";
import data from "../public/images/image_tags.json";
import uniqueTags from "../public/images/all_tags.json";
import "./App.css";
import { IImageMetadata } from "./types";
import TagSidebar from "@/components/TagSidebar";
import ImageGrid from "@/components/ImageGrid";
import ImagePagination from "@/components/ImagePagination";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  const [images, setImages] = useState<IImageMetadata[]>([]);
  const [filteredImages, setFilteredImages] = useState<IImageMetadata[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(24);

  useEffect(() => {
    // read JSON file and initialize state
    setImages(data);
    setFilteredImages(data);
    uniqueTags.sort();
    setTags(uniqueTags);
  }, []);

  useEffect(() => {
    if (currentTag) {
      setFilteredImages(
        images.filter((image) => image.tags.includes(currentTag))
      );
    } else {
      setFilteredImages(images);
    }
  }, [currentTag, images]);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );
  const handleTagChange = (tag: string) => {
    setCurrentPage(1);
    setCurrentTag(tag);
  };

  return (
    <SidebarProvider>
      <div className="flex">
        <TagSidebar tags={tags} setCurrentTag={handleTagChange} />
        <div className="flex flex-col w-full">
          <div className="fixed w-full flex items-center p-4 gap-6 bg-background">
            <SidebarTrigger size="icon" />
            <ImagePagination
              totalImages={filteredImages.length}
              imagesPerPage={imagesPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="imagesPerPage">Images Per Page</Label>
              <Input
                id="imagesPerPage"
                className="max-w-16"
                type="number"
                value={imagesPerPage}
                onChange={(e) => {
                  setImagesPerPage(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="mt-24">
            <ImageGrid images={currentImages} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
