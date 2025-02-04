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
import { useTagsContext } from "@/contexts/TagsContext";
import { usePaginationContext } from "@/contexts/PaginationContext";
const TagSidebar = () => {
  const { setSelectedTags } = useTagsContext();
  const { setCurrentPage } = usePaginationContext();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: any) => setSearchTerm(e.target.value);
  const handleClear = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setCurrentPage(1);
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
          <TagList searchTerm={searchTerm} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default TagSidebar;
