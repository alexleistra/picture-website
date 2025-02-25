import { SidebarTrigger } from "@/components/ui/sidebar";
import ImagePagination from "@/components/ImagePagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePaginationContext } from "@/contexts/PaginationContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Cog } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTagsContext } from "@/contexts/TagsContext";

const Header = () => {
  const { itemsPerPage, setItemsPerPage, setCurrentPage } =
    usePaginationContext();
  const { confidenceTolerance, setConfidenceTolerance } = useTagsContext();
  const { setTheme } = useTheme();

  return (
    <div className="sticky top-0 flex flex-wrap xl:flex-nowrap self-start items-center h-20 w-auto gap-4 p-4 bg-background">
      <SidebarTrigger className="order-0" size="icon" />

      <div className="order-2 xl:order-1 basis-full w-full mx-auto">
        <ImagePagination />
      </div>
      <div className="order-1 xl:order-2 flex items-center gap-3 ml-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Cog className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Settings</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="flex flex-col justify-center gap-3">
              <div className="flex flex-wrap justify-between items-center gap-x-3">
                <Label className="basis-full" htmlFor="imagesPerPage">
                  Images Per Page
                </Label>
                <Slider
                  className="basis-4/6"
                  id="imagesPerPage"
                  value={[itemsPerPage]}
                  min={8}
                  max={24}
                  step={1}
                  onValueChange={(n) => {
                    setCurrentPage(1);
                    setItemsPerPage(n[0]);
                  }}
                />
                <Input
                  className="basis-1/4 flex-shrink-0"
                  type="number"
                  value={itemsPerPage}
                  max={24}
                  min={8}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setItemsPerPage(Number(e.target.value));
                  }}
                />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-x-3">
                <Label className="basis-full" htmlFor="confidenceTolerance">
                  Tag Confidence
                </Label>
                <Slider
                  className="basis-4/6"
                  id="confidenceTolerance"
                  value={[confidenceTolerance]}
                  min={50}
                  max={100}
                  step={1}
                  onValueChange={(n) => {
                    setConfidenceTolerance(n[0]);
                  }}
                />
                <Input
                  className="basis-1/4 flex-shrink-0"
                  type="number"
                  value={confidenceTolerance}
                  max={100}
                  min={50}
                  onChange={(e) => {
                    setConfidenceTolerance(Number(e.target.value));
                  }}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="order-3">
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
    </div>
  );
};

export default Header;
