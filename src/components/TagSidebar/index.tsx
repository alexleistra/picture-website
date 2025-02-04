import { useState } from "react";
import TagList from "@/components/TagList";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export interface ISidebarParams {
  tags: string[];
  setCurrentTags: (tags: string[]) => void;
}

const TagSidebar = ({ tags, setCurrentTags }: ISidebarParams) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: any) => setSearchTerm(e.target.value);
  const handleClear = () => {
    setSearchTerm("");
    setCurrentTags([]);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <input
          type="text"
          placeholder="Search Tags"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border"
        />
        <Button onClick={handleClear}>Clear</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <TagList
            tags={tags}
            searchTerm={searchTerm}
            setCurrentTags={setCurrentTags}
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default TagSidebar;
