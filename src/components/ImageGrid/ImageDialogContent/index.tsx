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
      aria-describedby="Image carousel"
      className="top-0 left-0 translate-x-0 translate-y-0 p-0 max-w-full"
    >
      <DialogHeader>
        <DialogTitle className="mx-auto p-3 overflow-hidden">
          {selectedImage?.description}
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          {selectedImage?.file != undefined ? (
            <ImageProxy
              src={
                selectedImage
                  ? `${import.meta.env.VITE_IMAGE_PATH}/${selectedImage?.file}`
                  : ""
              }
              alt={selectedImage?.description}
              className=""
              options={{ format: "webp", height: "672" }}
            />
          ) : (
            <img height="672" src="placeholder.png" />
          )}
        </div>
        <Collapsible
          open={tagsVisible}
          className="flex flex-col justify-center items-center m-2 gap-2"
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
          <CollapsibleContent className="flex flex-wrap justify-center gap-1">
            {selectedImage?.tags
              .sort((a, b) => a.object.localeCompare(b.object))
              .map((tag) => (
                <Badge key={"dialog-" + tag.object}>
                  <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {tag.object}:{tag.confidence}
                  </div>
                </Badge>
              ))}
          </CollapsibleContent>
        </Collapsible>

        <div className="flex-shrink-0 h-64 lg:h-80 p-3">
          <ImageCarousel
            images={images}
            selectedImageIndex={selectedImageIndex}
            setSelected={setSelected}
          />

          <ImagePagination />
        </div>
      </div>
    </DialogContent>
  );
};

export default ImageDialogContent;
