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
    <ul>
      {filteredTags.map((tag) => (
        <li
          key={tag}
          onClick={() => setCurrentTag(tag)}
          className="cursor-pointer py-1"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagList;
