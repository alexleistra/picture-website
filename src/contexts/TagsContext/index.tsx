import { createContext, useContext, useEffect, useState } from "react";

interface ITagsContext {
  tags: string[];
  selectedTags: string[];
  setTags: (tags: string[]) => void;
  setSelectedTags: (tags: string[]) => void;
}

export const TagsContext = createContext<ITagsContext | undefined>(undefined);

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

  return (
    <TagsContext.Provider
      value={{
        tags,
        selectedTags,
        setTags,
        setSelectedTags,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};
