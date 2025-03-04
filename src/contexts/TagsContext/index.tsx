import { DEFAULT_TAG_TOLERANCE } from "@/lib/constants";
import { createContext, useContext, useEffect, useState } from "react";

interface ITagsContext {
  tags: string[];
  selectedTags: string[];
  confidenceTolerance: number;
  setTags: (tags: string[]) => void;
  setSelectedTags: (tags: string[]) => void;
  setConfidenceTolerance: (tolerance: number) => void;
  setTagSelected: (tag: string, selected: boolean) => void;
}

const TagsContext = createContext<ITagsContext | undefined>(undefined);

export const useTagsContext = () => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error("useTagsContext must be used within a TagsContextProvider");
  }
  return context;
};

export const TagsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [confidenceTolerance, setConfidenceTolerance] = useState<number>(
    DEFAULT_TAG_TOLERANCE
  );

  useEffect(() => {
    // read JSON file and initialize state
    fetch(`${import.meta.env.VITE_IMAGE_PATH}/all_tags.json`).then(
      async (res: Response) => {
        if (res.ok) {
          const uniqueTags = (await res.json()) as string[];
          uniqueTags.sort();
          setTags(uniqueTags);
        }
      }
    );
  }, []);

  const setTagSelected = (tag: string, selected: boolean) => {
    if (selected) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        selectedTags,
        confidenceTolerance,
        setTags,
        setSelectedTags,
        setConfidenceTolerance,
        setTagSelected,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};
