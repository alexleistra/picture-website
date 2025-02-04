import "./App.css";
import { TagsContextProvider } from "@/contexts/TagsContext";
import TaggedImageBrowser from "./components/TaggedImageBrowser";
import { useEffect, useState } from "react";
import { IImageMetadata } from "./types/ImageMetadata";

function App() {
  const [images, setImages] = useState<IImageMetadata[]>([]);
  useEffect(() => {
    // read JSON file and initialize state
    fetch(`${import.meta.env.VITE_IMAGE_PATH}/image_metadata.json`).then(
      async (res: Response) => {
        if (res.ok) {
          const data = (await res.json()) as IImageMetadata[];
          setImages(data);
        }
      }
    );
  }, []);

  return (
    <TagsContextProvider>
      <TaggedImageBrowser images={images} />
    </TagsContextProvider>
  );
}

export default App;
