import { IImageMetadata } from "@/types/ImageMetadata";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageProxy from "@/components/ImageProxy";
import ImagePagination from "@/components/ImagePagination";
import ImageCarousel from "@/components/ImageCarousel";

interface ImageDialogContentProps {
  images: IImageMetadata[];
  selectedImage: IImageMetadata;
  selectedImageIndex: number;
  setSelected: (image: IImageMetadata, index: number) => void;
}

const ImageDialogContent = ({
  images,
  selectedImage,
  selectedImageIndex,
  setSelected,
}: ImageDialogContentProps) => {
  return (
    <DialogContent
      aria-describedby="Image carousel"
      className="top-0 left-0 translate-x-0 translate-y-0 p-0 max-w-full m-auto h-full"
    >
      <DialogHeader>
        <DialogTitle className="mx-auto py-3 pt-8">
          {selectedImage?.alt}
        </DialogTitle>
      </DialogHeader>
      <div className="absolute bottom-0 w-full">
        <div className="flex justify-center">
          {selectedImage?.file != undefined ? (
            <ImageProxy
              src={
                selectedImage
                  ? `${import.meta.env.VITE_IMAGE_PATH}/${selectedImage?.file}`
                  : ""
              }
              alt={selectedImage.alt}
              className="max-h-[60vh] max-w-full"
              options={{ format: "webp", height: "672" }}
            />
          ) : (
            // TODO spinner
            <img height="672" />
          )}
        </div>

        <div className="flex flex-col">
          <ImageCarousel
            images={images}
            selectedImageIndex={selectedImageIndex}
            setSelected={setSelected}
          />
          <div className="py-4">
            <ImagePagination />
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ImageDialogContent;
