import { IImageMetadata } from "@/types/ImageMetadata";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import ImageProxy from "@/components/ImageProxy";
import ImageDialogContent from "@/components/ImageGrid/ImageDialogContent";
import { useTagsContext } from "@/contexts/TagsContext";
import { usePaginationContext } from "@/contexts/PaginationContext";

export interface IImageGridParams {
  images: IImageMetadata[];
}

const ImageGrid = ({ images }: IImageGridParams) => {
  const { selectedTags } = useTagsContext();
  const {
    currentPage,
    itemsPerPage: imagesPerPage,
    setItemCount,
  } = usePaginationContext();
  const [currentImages, setCurrentImages] = useState<IImageMetadata[]>(images);
  const [selectedImage, setSelectedImage] = useState<IImageMetadata>(images[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const setSelected = (image: IImageMetadata, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    let filteredImages = images;
    if (selectedTags.length > 0) {
      filteredImages = images.filter((image) => {
        return selectedTags.every((item) => image.tags.includes(item));
      });
    }

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    setItemCount(filteredImages.length);
    setCurrentImages(filteredImages.slice(indexOfFirstImage, indexOfLastImage));
  }, [selectedTags, images, currentPage, imagesPerPage]);

  return (
    <Dialog>
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {currentImages.map((image: IImageMetadata, index) => (
          <div key={index}>
            <DialogTrigger onClick={() => setSelected(image, index)}>
              <ImageProxy
                className="h-auto w-[40vw] lg:h-80 lg:w-auto"
                src={`${import.meta.env.VITE_IMAGE_PATH}/${image.file}`}
                alt={image.alt}
                options={{ format: "webp", height: "320" }}
              />
            </DialogTrigger>
          </div>
        ))}
      </div>

      <ImageDialogContent
        images={currentImages}
        selectedImage={selectedImage}
        selectedImageIndex={selectedImageIndex}
        setSelected={setSelected}
      />
    </Dialog>
  );
};

export default ImageGrid;
