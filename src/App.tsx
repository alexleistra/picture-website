import { useEffect, useState } from "react";
import "./App.css";
import { IImageMetadata } from "./types/ImageMetadata";
import TagSidebar from "@/components/TagSidebar";
import ImageGrid from "@/components/ImageGrid";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";

function App() {
  const [images, setImages] = useState<IImageMetadata[]>([]);
  const [filteredImages, setFilteredImages] = useState<IImageMetadata[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(16);

  useEffect(() => {
    // read JSON file and initialize state
    const dataPromise = fetch(
      `${import.meta.env.VITE_IMAGE_PATH}/image_tags.json`
    );
    const allTagsPromise = fetch(
      `${import.meta.env.VITE_IMAGE_PATH}/all_tags.json`
    );

    Promise.all([dataPromise, allTagsPromise]);

    dataPromise.then(async (res: Response) => {
      if (res.ok) {
        const data = (await res.json()) as IImageMetadata[];
        setImages(data);
        setFilteredImages(data);
      }
    });
    allTagsPromise.then(async (res: Response) => {
      if (res.ok) {
        const uniqueTags = (await res.json()) as string[];
        uniqueTags.sort();
        setTags(uniqueTags);
      }
    });
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
  const handleImagesPerPageChange = (n: number) => {
    setCurrentPage(1);
    setImagesPerPage(n);
  };

  return (
    <SidebarProvider>
      <TagSidebar tags={tags} setCurrentTag={handleTagChange} />
      <div className="w-full">
        <Header
          currentPage={currentPage}
          filteredImages={filteredImages}
          imagesPerPage={imagesPerPage}
          setCurrentPage={setCurrentPage}
          handleImagesPerPageChange={handleImagesPerPageChange}
        />

        <div className="mt-24">
          <ImageGrid images={currentImages} />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
