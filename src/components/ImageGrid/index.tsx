import { IImageMetadata } from "@/types/ImageMetadata";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import ImageProxy from "@/components/ImageProxy";
import ImageDialogContent from "@/components/ImageDialogContent";

export interface IImageGridParams {
  images: IImageMetadata[];
}

const ImageGrid = ({ images }: IImageGridParams) => {
  const [selectedImage, setSelectedImage] = useState<IImageMetadata>(images[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const setSelected = (image: IImageMetadata, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  return (
    <Dialog>
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {images.map((image: IImageMetadata, index) => (
          <div key={index}>
            <DialogTrigger onClick={() => setSelected(image, index)}>
              <ImageProxy
                className="h-auto w-[40vw] lg:h-80 lg:w-auto"
                src={`${import.meta.env.VITE_IMAGE_PATH}/${image.file}`}
                alt={image.file}
                options={{ format: "webp", height: "320" }}
              />
            </DialogTrigger>
          </div>
        ))}
      </div>

      <ImageDialogContent
        images={images}
        selectedImage={selectedImage}
        selectedImageIndex={selectedImageIndex}
        setSelected={setSelected}
      />
    </Dialog>
  );
};

export default ImageGrid;
