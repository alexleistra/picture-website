import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useTagsContext } from "@/contexts/TagsContext";
import { CheckedState } from "@radix-ui/react-checkbox";
import { usePaginationContext } from "@/contexts/PaginationContext";

export interface ITagListParams {
  searchTerm: string;
}

const fuzzyMatch = (pattern: string, str: string) => {
  pattern = pattern.split("").reduce((a, b) => `${a}.*${b}`);
  return new RegExp(pattern).test(str);
};

const TagList = ({ searchTerm }: ITagListParams) => {
  const { tags, selectedTags, setSelectedTags } = useTagsContext();
  const { setCurrentPage } = usePaginationContext();

  const filteredTags = searchTerm
    ? [...tags].filter((tag) => fuzzyMatch(searchTerm, tag))
    : [...tags];

  const setTagSelected = (tag: string, selected: boolean) => {
    if (selected) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {filteredTags.map((tag) => (
        <Badge key={tag} aria-label={tag} className="flex items-center gap-2">
          <Checkbox
            id={tag}
            checked={selectedTags.includes(tag)}
            onCheckedChange={(checked: CheckedState) => {
              setTagSelected(tag, checked === true);
              setCurrentPage(1);
            }}
          />
          <label
            htmlFor={tag}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {tag}
          </label>
        </Badge>
      ))}
    </div>
  );
};

export default TagList;
