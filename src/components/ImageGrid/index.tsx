import { IImageMetadata } from "@/types/ImageMetadata";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import ImageProxy from "@/components/ImageProxy";
import ImageDialogContent from "@/components/ImageGrid/ImageDialogContent";
import { useTagsContext } from "@/contexts/TagsContext";
import { usePaginationContext } from "@/contexts/PaginationContext";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export interface IImageGridParams {
  images: IImageMetadata[];
}

const ImageGrid = ({ images }: IImageGridParams) => {
  const { selectedTags, confidenceTolerance, setConfidenceTolerance } =
    useTagsContext();
  const { currentPage, itemsPerPage, setItemCount } = usePaginationContext();
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
        return selectedTags.every((item) =>
          image.tags
            .filter((t) => {
              return t.confidence >= confidenceTolerance;
            })
            .map((t) => t.object)
            .includes(item)
        );
      });
    }

    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    setItemCount(filteredImages.length);
    setCurrentImages(filteredImages.slice(indexOfFirstImage, indexOfLastImage));
    setSelected(filteredImages[indexOfFirstImage], 0);
  }, [images, selectedTags, confidenceTolerance, currentPage, itemsPerPage]);

  return (
    <Dialog>
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {currentImages.map((image: IImageMetadata, index) => (
          <div key={index}>
            <DialogTrigger onClick={() => setSelected(image, index)}>
              <ImageProxy
                className="h-auto w-[40vw] lg:h-80 lg:w-auto"
                src={`${import.meta.env.VITE_IMAGE_PATH}/${image.file}`}
                alt={image.description}
                options={{ format: "webp", height: 320 }}
              />
            </DialogTrigger>
          </div>
        ))}
        {currentImages.length == 0 && (
          <div className="min-w-80 flex flex-wrap gap-x-3">
            <Label className="basis-full" htmlFor="emptyConfidenceTolerance">
              Tag Confidence
            </Label>
            <Slider
              className="basis-4/6"
              id="emptyConfidenceTolerance"
              value={[confidenceTolerance]}
              min={50}
              max={100}
              step={1}
              onValueChange={(n) => {
                setConfidenceTolerance(n[0]);
              }}
            />
            <Input
              className="basis-1/4 flex-shrink-0"
              type="number"
              value={confidenceTolerance}
              max={100}
              min={50}
              onChange={(e) => {
                setConfidenceTolerance(Number(e.target.value));
              }}
            />
          </div>
        )}
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
