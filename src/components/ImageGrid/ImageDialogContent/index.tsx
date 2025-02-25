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
    <DialogContent aria-describedby="Image carousel" className="p-0">
      <DialogHeader className="mx-9 my-3">
        <DialogTitle className="">{selectedImage?.description}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="flex-1 flex justify-center items-center">
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
            <ScrollArea className="max-h-14 rounded-md border">
              {selectedImage?.tags
                .sort((a, b) => a.object.localeCompare(b.object))
                .map((tag) => (
                  <Badge key={"dialog-" + tag.object}>
                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {tag.object}:{tag.confidence}
                    </div>
                  </Badge>
                ))}
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>

        <div className="p-3">
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
