import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { useContext, useState, createContext, useEffect } from "react";

interface SearchContextValue {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch() {
  const search: any = useContext(SearchContext);
  if (!search) {
    throw new Error("SearchContext must be wrapped in a SearchProvider");
  }
  return search;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const value: SearchContextValue = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
