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
  ...props
}: ImageCarouselProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi?.scrollTo(selectedImageIndex, true);
  }, [emblaApi, selectedImageIndex]);

  return (
    <Carousel
      {...props}
      setApi={setEmblaApi}
      className={`px-14 bg-background ${props.className}`}
    >
      <CarouselPrevious size="icon" className="absolute left-3" />

      <CarouselContent className="flex items-center">
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-auto">
            <ImageProxy
              onClick={() => setSelected(image, index)}
              src={`${import.meta.env.VITE_IMAGE_PATH}/${image?.file}`}
              alt={image.description}
              className={`h-24 lg:h-32 w-auto border-blue-700 dark:border-white ${
                selectedImageIndex == index
                  ? "pb-0 border-b-8"
                  : "pb-2 hover:pb-0 border-solid hover:border-b-8 cursor-pointer"
              }`}
              options={{ format: "webp", height: 88 }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext className="absolute right-3" />
    </Carousel>
  );
};

export default ImageCarousel;
