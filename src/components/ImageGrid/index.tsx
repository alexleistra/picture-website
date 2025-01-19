import { IImageMetadata } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

export interface IImageGridParams {
  images: IImageMetadata[];
}

const ImageGrid = ({ images }: IImageGridParams) => {
  const [selectedImage, setSelectedImage] = useState<IImageMetadata>({
    file: "",
    created: 0,
    tags: [],
  });
  function openClicked(image: IImageMetadata) {
    setSelectedImage(image);
  }

  return (
    <>
      <Dialog>
        <div className="flex flex-wrap gap-4 p-4">
          {images.map((image: IImageMetadata) => (
            <div key={image.created}>
              <DialogTrigger onClick={() => openClicked(image)}>
                <img
                  src={`/images/thumbnails/${image.file}`}
                  alt={image.file}
                  height="256"
                />
              </DialogTrigger>
            </div>
          ))}
        </div>
        <DialogContent className="max-w-screen h-screen p-0 flex justify-center">
          <img
            src={`/images/${selectedImage?.file}`}
            alt={selectedImage.file}
            className="max-h-screen"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGrid;
