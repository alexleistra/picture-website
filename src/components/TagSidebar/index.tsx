import { useState } from "react";
import TagList from "@/components/TagList";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export interface ISidebarParams {
  tags: string[];
  setCurrentTag: (str: string) => void;
}

const TagSidebar = ({ tags, setCurrentTag }: ISidebarParams) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: any) => setSearchTerm(e.target.value);

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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <TagList
            tags={tags}
            searchTerm={searchTerm}
            setCurrentTag={setCurrentTag}
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
    // <div className="w-1/4 h-screen overflow-y-auto bg-gray-100 p-4">
    //   <input
    //     type="text"
    //     placeholder="Search Tags"
    //     value={searchTerm}
    //     onChange={handleSearch}
    //     className="w-full p-2 mb-4 border"
    //   />
    //   <TagList
    //     tags={tags}
    //     searchTerm={searchTerm}
    //     setCurrentTag={setCurrentTag}
    //   />
    // </div>
  );
};

export default TagSidebar;
