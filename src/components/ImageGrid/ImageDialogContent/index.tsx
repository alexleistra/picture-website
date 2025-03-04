import { IImageMetadata } from "@/types/ImageMetadata";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageProxy from "@/components/ImageProxy";
import ImagePagination from "@/components/ImagePagination";
import ImageCarousel from "@/components/ImageCarousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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
  const [tagsVisible, setTagsVisible] = useState(false);

  return (
    <DialogContent
      aria-describedby={undefined}
      className="p-0 left-0 top-0 w-screen max-w-screen max-h-screen translate-x-0 translate-y-0"
    >
      <div className="flex flex-col ios:h-ios h-[100vh]">
        <DialogHeader className="flex-shrink-0 mx-9 my-3 mb-7">
          <DialogTitle className="">{selectedImage?.description}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          {selectedImage?.file && (
            <ImageProxy
              src={
                selectedImage
                  ? `${import.meta.env.VITE_IMAGE_PATH}/${selectedImage?.file}`
                  : ""
              }
              alt={selectedImage?.description}
              fetchPriority="high"
              options={{ format: "webp", height: 672 }}
            />
          )}
        </div>
        <Collapsible
          open={tagsVisible}
          className="flex flex-col justify-center items-center pt-3"
        >
          <CollapsibleTrigger
            onClick={() => {
              setTagsVisible(!tagsVisible);
            }}
          >
            {tagsVisible ? (
              <Badge>
                Hide Tags <ChevronUp />
              </Badge>
            ) : (
              <Badge>
                View Tags <ChevronDown />
              </Badge>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-wrap justify-center">
            <ScrollArea className="max-h-14 max-w-5xl">
              {selectedImage?.tags
                .sort((a, b) => a.object.localeCompare(b.object))
                .map((tag) => (
                  <Badge
                    className="m-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    key={"dialog-" + tag.object}
                  >
                    {tag.object}:{tag.confidence}
                  </Badge>
                ))}
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
        <ImageCarousel
          className="flex-shrink-0 py-3"
          images={images}
          selectedImageIndex={selectedImageIndex}
          setSelected={setSelected}
        />
        <ImagePagination className="pb-3" />
      </div>
    </DialogContent>
  );
};

export default ImageDialogContent;
