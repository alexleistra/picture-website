import { IImageMetadata } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi?.scrollTo(selectedImage, true);
    emblaApi.on("slidesInView", () => {
      setSlidesInView(emblaApi.slidesInView());
    });
  }, [emblaApi, selectedImage]);

  return (
    <>
      <Dialog>
        <div className="flex flex-wrap gap-4 p-4 justify-center">
          {images.map((image: IImageMetadata, index) => (
            <div key={index}>
              <DialogTrigger onClick={() => setSelectedImage(index)}>
                <ImageProxy
                  className="h-auto w-[40vw] md:h-80 md:w-auto"
                  src={`/images/${image.file}`}
                  alt={image.file}
                  height="320"
                  format="webp"
                />
              </DialogTrigger>
            </div>
          ))}
        </div>
        <DialogTitle></DialogTitle>
        <DialogContent
          aria-describedby="Image carousel"
          className="max-w-screen p-0"
        >
          <div className="flex justify-center">
            <Carousel
              setApi={setEmblaApi}
              className="w-full md:max-w-[70vw] h-screen"
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <ImageProxy
                      src={`/images/${image?.file}`}
                      alt={image.file}
                      className="max-h-[80vh] mx-auto"
                      format="webp"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <div className="flex flex-row overflow-x-scroll">
                {images.map((image: IImageMetadata, index) => (
                  <div
                    className={`flex-none max-h-min${
                      slidesInView[0] == index
                        ? " border-solid border-2 border-red-700"
                        : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedImage(index)}
                  >
                    <ImageProxy
                      className="h-32 w-auto"
                      src={`/images/${image.file}`}
                      alt={image.file}
                      height="100"
                      format="webp"
                    />
                  </div>
                ))}
              </div>
              <CarouselNext />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGrid;
