import { IImageMetadata } from "@/types/ImageMetadata";
import { createContext } from "react";

export interface IPaginationContext {
    currentPage: number;
    imagesPerPage: number;
    filteredImages: IImageMetadata[];
    setCurrentPage: (page: number) => void;
}

export const PaginationContext = createContext<IPaginationContext>({currentPage: 0, imagesPerPage: 0, filteredImages: [], setCurrentPage: () => {}})