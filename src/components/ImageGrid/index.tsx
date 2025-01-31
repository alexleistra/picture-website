import { IImageMetadata } from "@/types/ImageMetadata";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ImageProxy from "@/components/ImageProxy";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImagePagination from "@/components/ImagePagination";

export interface IImageGridParams {
  images: IImageMetadata[];
}

const ImageGrid = ({ images }: IImageGridParams) => {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [selectedImage, setSelectedImage] = useState<IImageMetadata>(images[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const setSelected = (image: IImageMetadata, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi?.scrollTo(selectedImageIndex, true);
  }, [emblaApi, selectedImageIndex]);

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
      <DialogContent
        aria-describedby="Image carousel"
        className="top-0 left-0 translate-x-0 translate-y-0 p-0 max-w-full m-auto h-screen"
      >
        <DialogHeader>
          <DialogTitle className="mx-auto py-3">
            {selectedImage?.alt}
          </DialogTitle>
        </DialogHeader>
        <div className="absolute bottom-0 w-full">
          <div className="">
            {selectedImage?.file != undefined ? (
              <ImageProxy
                src={
                  selectedImage
                    ? `${import.meta.env.VITE_IMAGE_PATH}/${
                        selectedImage?.file
                      }`
                    : ""
                }
                alt={selectedImage.file}
                className=""
                options={{ format: "webp", height: "672" }}
              />
            ) : (
              // TODO spinner
              <img height="672" />
            )}
          </div>

          <div className="flex flex-col">
            <Carousel setApi={setEmblaApi} className="px-10 bg-background">
              <CarouselPrevious size="icon" className="absolute left-0" />

              <CarouselContent className="flex items-center">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="basis-auto p-0">
                    <div onClick={() => setSelected(image, index)}>
                      <ImageProxy
                        src={`${import.meta.env.VITE_IMAGE_PATH}/${
                          image?.file
                        }`}
                        alt={image.file}
                        className={
                          selectedImageIndex == index
                            ? "h-32 lg:h-48"
                            : "h-24 lg:h-40 w-auto cursor-pointer"
                        }
                        options={{ format: "webp", height: "192" }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNext className="absolute right-0" />
            </Carousel>
            <ImagePagination />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGrid;
