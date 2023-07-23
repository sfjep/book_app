import React, { useState } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NewBookButton from "../components/NewButton";
import BookshelfHeader from "../components/BookshelfHeader";
import Bookshelf from "../components/Bookshelf";
import useFilteredBooks from "../hooks/useFilteredBooks";
import { RatedBook } from "../types/Book";
import { Layout } from "../constants";

const PageDashboard = ({ books, setBooks }) => {
  console.log("PageDashboard rendered");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  let filteredBooks: RatedBook[] = useFilteredBooks(books, searchTerm);

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
          <div>
            <TextField
              label="Search Title/Author"
              value={searchTerm}
              onChange={handleSearch}
              style={{ flexGrow: 1 }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
          </div>
          <div>
            <NewBookButton />
          </div>
        </div>
      </div>
      <div style={{ height: 800 }}>
        <Bookshelf books={filteredBooks} />
      </div>
    </div>
  );
};

export default React.memo(PageDashboard);
