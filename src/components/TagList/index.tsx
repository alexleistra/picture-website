import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export interface ITagListParams {
  tags: string[];
  searchTerm: string;
  setCurrentTags: (tags: string[]) => void;
}

const fuzzyMatch = (pattern: string, str: string) => {
  pattern = pattern.split("").reduce((a, b) => `${a}.*${b}`);
  return new RegExp(pattern).test(str);
};

const TagList = ({ tags, searchTerm, setCurrentTags }: ITagListParams) => {
  const filteredTags = searchTerm
    ? tags.filter((tag) => fuzzyMatch(searchTerm, tag))
    : tags;

  return (
    <div className="flex flex-wrap gap-1">
      {filteredTags.map((tag) => (
        <Badge key={tag} aria-label={tag}>
          <Checkbox
            id={tag}
            onCheckedChange={(checked: CheckedState) => {
              if (checked) {
                setCurrentTags([tag]);
              } else {
                setCurrentTags([]);
              }
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
