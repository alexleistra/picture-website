import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useState, createContext, useContext } from "react";

export interface IPaginationContext {
  currentPage: number;
  itemsPerPage: number;
  itemCount: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (page: number) => void;
  setItemCount: (count: number) => void;
}

const PaginationContext = createContext<IPaginationContext | undefined>(
  undefined
);

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error(
      "usePaginationContext must be used within a PaginationContextProvider"
    );
  }
  return context;
};

export const PaginationContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [itemCount, setItemCount] = useState<number>(0);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        itemsPerPage,
        itemCount,
        setCurrentPage,
        setItemsPerPage,
        setItemCount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
