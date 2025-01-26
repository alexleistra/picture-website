import { IImageMetadata } from "@/types/ImageMetadata";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ImageProxy from "../ImageProxy";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <>
      <Dialog>
        <div className="flex flex-wrap gap-4 p-4 justify-center">
          {images.map((image: IImageMetadata, index) => (
            <div key={index}>
              <DialogTrigger onClick={() => setSelected(image, index)}>
                <ImageProxy
                  className="h-auto w-[40vw] md:h-80 md:w-auto"
                  src={`${import.meta.env.VITE_IMAGE_PATH}${image.file}`}
                  alt={image.file}
                  height="320"
                  format="webp"
                />
              </DialogTrigger>
            </div>
          ))}
        </div>
        <DialogContent
          aria-describedby="Image carousel"
          className="min-w-full h-screen"
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col max-h-max">
            <div>
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
                  className="max-h-full"
                  format="webp"
                />
              ) : (
                <img height="1080" />
              )}
            </div>
            <Carousel setApi={setEmblaApi} className="px-10 bg-background">
              <CarouselPrevious className="absolute left-0 h-30" />

              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/">
                    <div className="" onClick={() => setSelected(image, index)}>
                      <ImageProxy
                        src={`${import.meta.env.VITE_IMAGE_PATH}/${
                          image?.file
                        }`}
                        alt={image.file}
                        className=""
                        format="webp"
                        height="200"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNext className="absolute right-0 h-30" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGrid;
