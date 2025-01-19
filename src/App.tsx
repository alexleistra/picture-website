import { useEffect, useState } from "react";
import data from "../public/images/image_tags.json";
import uniqueTags from "../public/images/all_tags.json";
import "./App.css";
import { IImageMetadata } from "./types";
import TagSidebar from "@/components/TagSidebar";
import ImageGrid from "@/components/ImageGrid";
import ImagePagination from "@/components/ImagePagination";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";

function App() {
  const [images, setImages] = useState<IImageMetadata[]>([]);
  const [filteredImages, setFilteredImages] = useState<IImageMetadata[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(24);

  useEffect(() => {
    // read JSON file and initialize state
    setImages(data);
    setFilteredImages(data);
    uniqueTags.sort();
    setTags(uniqueTags);
  }, []);

  useEffect(() => {
    if (currentTag) {
      setFilteredImages(
        images.filter((image) => image.tags.includes(currentTag))
      );
    } else {
      setFilteredImages(images);
    }
  }, [currentTag, images]);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const { setTheme } = useTheme();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex">
          <TagSidebar tags={tags} setCurrentTag={setCurrentTag} />
          <div className="flex flex-col w-full">
            <div className="fixed w-full flex items-center p-4 gap-6 bg-background">
              <SidebarTrigger size="icon" />
              <ImagePagination
                totalImages={filteredImages.length}
                imagesPerPage={imagesPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="imagesPerPage">Images Per Page</Label>
                <Input
                  id="imagesPerPage"
                  type="number"
                  value={imagesPerPage}
                  onChange={(e) => {
                    setImagesPerPage(Number(e.target.value));
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-24">
              <ImageGrid images={currentImages} />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
