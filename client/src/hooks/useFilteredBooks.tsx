import { useMemo } from "react";
import useDebounce from "./useDebounce";
import { RatedBook } from "../types/Book";

const useFilteredBooks = (books: RatedBook[], searchTerm: string) => {
  // Wait 500ms after user stops typing to filter results
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return useMemo(() => {
    return books.filter((book: RatedBook) => {
      return (
        book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    });
  }, [books, debouncedSearchTerm]);
};

export default useFilteredBooks;
