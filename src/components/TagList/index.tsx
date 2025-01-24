import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

export interface ITagListParams {
  tags: string[];
  searchTerm: string;
  setCurrentTag: (str: string) => void;
}

const fuzzyMatch = (pattern: string, str: string) => {
  pattern = pattern.split("").reduce((a, b) => `${a}.*${b}`);
  return new RegExp(pattern).test(str);
};

const TagList = ({ tags, searchTerm, setCurrentTag }: ITagListParams) => {
  const filteredTags = searchTerm
    ? tags.filter((tag) => fuzzyMatch(searchTerm, tag))
    : tags;

  return (
    <div className="flex flex-wrap gap-1">
      {filteredTags.map((tag) => (
        <Button
          key={tag}
          value={tag}
          aria-label={tag}
          onClick={() => setCurrentTag(tag)}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

export default TagList;
