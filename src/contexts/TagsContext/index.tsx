import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface ITagsContext {
  tags: Set<string>;
  selectedTags: Set<string>;
  setSelected: (tag: string, selected: boolean) => void;
}

export const TagsContext = createContext<ITagsContext>({
  tags: new Set([]),
  selectedTags: new Set([]),
  setSelected: () => {},
});

export const TagsContextProvider: React.FC = ({
  children,
}: PropsWithChildren) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set([]));
  const [tags, setTags] = useState<Set<string>>(new Set([]));
  const setSelected = (tag: string, selected: boolean) => {
    if (selected) {
      selectedTags.add(tag);
      setSelectedTags(selectedTags);
    } else {
      selectedTags.delete(tag);
      setSelectedTags(selectedTags);
    }
  };

  useEffect(() => {
    // read JSON file and initialize state
    fetch(`${import.meta.env.VITE_IMAGE_PATH}/all_tags.json`).then(
      async (res: Response) => {
        if (res.ok) {
          const uniqueTags = (await res.json()) as string[];
          uniqueTags.sort();
          setTags(new Set(uniqueTags));
        }
      }
    );
  }, []);

  return (
    <TagsContext.Provider value={{ tags, selectedTags, setSelected }}>
      {children}
    </TagsContext.Provider>
  );
};
