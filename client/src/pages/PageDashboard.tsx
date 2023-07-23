import React, { useState } from "react";
import { Button, TextField, Box, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NewBookButton from "../components/NewButton";
import BookshelfHeader from "../components/BookshelfHeader";
import Bookshelf from "../components/Bookshelf";
import useFilteredBooks from "../hooks/useFilteredBooks";
import { RatedBook } from "../types/Book";
import { Layout } from "../constants";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";

const PageDashboard = ({ books, setBooks }) => {
  console.log("PageDashboard rendered");

  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [primarySort, setPrimarySort] = useState({
    field: "None",
    direction: "asc",
  });
  const [secondarySort, setSecondarySort] = useState({
    field: "None",
    direction: "asc",
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterBooksBackend = async () => {
    try {
      console.log("Filtering");
      const response = await axios.get(
        APIConfig.baseURL + APIConfig.endpoints.getAllBooks,
        {
          params: {
            author: authorFilter,
            title: titleFilter,
          },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("An error occurred while fetching the books:", error);
    }
  };

  let filteredBooks: RatedBook[] = useFilteredBooks(books, searchTerm);

  // Apply sorting to the filtered books
  const handleSort = () => {
    let sortedBooks = [...filteredBooks]; // Create a copy to avoid mutating state directly

    // Define sorting logic for each field
    const sortLogic = {
      Title: (a, b) => a.title.localeCompare(b.title),
      Author: (a, b) => a.author.localeCompare(b.author),
      Rating: (a, b) => b.avg_rating - a.avg_rating,
      PublicationYear: (a, b) => b.publication_year - a.publication_year,
      NumberRatings: (a, b) => b.num_ratings - a.num_ratings,
    };

    // Apply primary sort
    if (primarySort.field !== "None") {
      sortedBooks.sort(sortLogic[primarySort.field]);
      if (primarySort.direction === "desc") {
        sortedBooks.reverse();
      }
    }

    // Apply secondary sort
    if (secondarySort.field !== "None") {
      sortedBooks.sort((a, b) => {
        if (sortLogic[primarySort.field](a, b) === 0) {
          return sortLogic[secondarySort.field](a, b);
        } else {
          return sortLogic[primarySort.field](a, b);
        }
      });
      if (secondarySort.direction === "desc") {
        sortedBooks.reverse();
      }
    }

    return sortedBooks;
  };

  // Function to reset the sort
  const resetSort = () => {
    setPrimarySort({ field: "None", direction: "asc" });
    setSecondarySort({ field: "None", direction: "asc" });
  };

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box marginLeft={2}>
              <TextField
                label="Filter Title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
              />
            </Box>
            <Box marginLeft={2}>
              <TextField
                label="Filter Author"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
              />
            </Box>
            <Box marginLeft={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={filterBooksBackend}
              >
                Filter Books (BE)
              </Button>
            </Box>
          </div>
          <div>
            <Select
              value={primarySort.field}
              onChange={(e) =>
                setPrimarySort({ ...primarySort, field: e.target.value })
              }
              style={{ marginRight: 20 }}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Title">Title</MenuItem>
              <MenuItem value="Author">Author</MenuItem>
              <MenuItem value="Rating">Rating</MenuItem>
              <MenuItem value="PublicationYear">PublicationYear</MenuItem>
              <MenuItem value="NumberRatings">NumberRatings</MenuItem>
            </Select>
            <Select
              value={secondarySort.field}
              onChange={(e) =>
                setSecondarySort({ ...secondarySort, field: e.target.value })
              }
              style={{ marginRight: 20 }}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Title">Title</MenuItem>
              <MenuItem value="Author">Author</MenuItem>
              <MenuItem value="Rating">Rating</MenuItem>
              <MenuItem value="PublicationYear">PublicationYear</MenuItem>
              <MenuItem value="NumberRatings">NumberRatings</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={resetSort}
              style={{ marginLeft: 10 }}
            >
              Reset Sort
            </Button>
          </div>
          <div>
            <NewBookButton />
          </div>
        </div>
      </div>
      <div style={{ height: 800 }}>
        <Bookshelf books={handleSort()} />
      </div>
    </div>
  );
};

export default React.memo(PageDashboard);
