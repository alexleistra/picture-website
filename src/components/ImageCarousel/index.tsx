import ImageProxy from "@/components/ImageProxy";
import { IImageMetadata } from "@/types/ImageMetadata";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: IImageMetadata[];
  selectedImageIndex: number;
  setSelected: (image: IImageMetadata, index: number) => void;
}

const ImageCarousel = ({
  images,
  selectedImageIndex,
  setSelected,
}: ImageCarouselProps) => {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi?.scrollTo(selectedImageIndex, true);
  }, [emblaApi, selectedImageIndex]);

  return (
    <Carousel setApi={setEmblaApi} className="px-14 bg-background">
      <CarouselPrevious size="icon" className="absolute left-3" />

      <CarouselContent className="flex items-center">
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-auto p-0">
            <div onClick={() => setSelected(image, index)}>
              <ImageProxy
                src={`${import.meta.env.VITE_IMAGE_PATH}/${image?.file}`}
                alt={image.alt}
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

      <CarouselNext className="absolute right-3" />
    </Carousel>
  );
};

export default ImageCarousel;
