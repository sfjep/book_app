// pages/PageDashboard.tsx
import React, { useState } from "react";
import { Layout } from "../constants";
import {
  BookshelfHeader,
  Bookshelf,
  Search,
  BackendFilter,
  Sort,
  NewBookButton,
} from "../components";
import { useAppSelector } from "../redux/hooks";
import { RatedBook } from "../types/Book";
import useFilteredBooks from "../hooks/useFilteredBooks";

const PageDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // useAppSelector is used to access data from our Redux store,
  const books = useAppSelector((state) => state.books);

  // Filter books by search term
  let filteredBooks: RatedBook[] = useFilteredBooks(books, searchTerm);

  // Set sorted books state
  const [sortedBooks, setSortedBooks] = useState(filteredBooks);

  return (
    <div
      style={{
        paddingLeft: Layout.standardPaddingLarge,
        paddingRight: Layout.standardPaddingLarge,
      }}
    >
      <div style={{ paddingBottom: Layout.standardPaddingLarge }}>
        <BookshelfHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Search setSearchTerm={setSearchTerm} />
          <BackendFilter />
          <Sort filteredBooks={filteredBooks} setSortedBooks={setSortedBooks} />
          <NewBookButton />
        </div>
      </div>
      <div style={{ height: 800 }}>
        <Bookshelf books={sortedBooks} />
      </div>
    </div>
  );
};

export default React.memo(PageDashboard);
