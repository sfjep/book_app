// pages/PageDashboard.tsx

import React, { useState } from "react";
import { Layout } from "../constants";
import NewBookButton from "../components/NewButton";
import BookshelfHeader from "../components/BookshelfHeader";
import Bookshelf from "../components/Bookshelf";
import Search from "../components/Search";
import BackendFilter from "../components/BackendFilter";
import Sort from "../components/Sort";
import { RatedBook } from "../types/Book";
import useFilteredBooks from "../hooks/useFilteredBooks";

const PageDashboard = ({ books, setBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  let filteredBooks: RatedBook[] = useFilteredBooks(books, searchTerm);
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
          <BackendFilter setBooks={setBooks} />
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
