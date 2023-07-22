import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";
import NewBookButton from "../components/NewButton";
import { Layout } from "../constants";
import BookshelfHeader from "../components/BookshelfHeader";
// import Bookshelf from "../components/Bookshelf";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import useFilteredBooks from "../hooks/useFilteredBooks";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RatedBook } from "../types/Book";

const PageDashboard = () => {
  console.log("PageDashboard rendered");

  const [books, setBooks] = useState<RatedBook[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${APIConfig.baseURL}${APIConfig.endpoints.getAllBooks}`
        );
        setBooks(response.data);
        console.log("books", response.data);
      } catch (error) {
        console.error("An error occurred while fetching the books:", error);
      }
    };

    fetchBooks();
  }, []);

  let filteredBooks: RatedBook[] = useFilteredBooks(books, searchTerm);

  const columns = [
    { field: "isbn", headerName: "ISBN", flex: 1 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "author", headerName: "Author", flex: 2 },
    { field: "publication_year", headerName: "Publication Year", flex: 1 },
    { field: "publisher", headerName: "Publisher", flex: 2 },
    { field: "avg_rating", headerName: "Average Rating", flex: 1 },
    { field: "num_ratings", headerName: "Number of Ratings", flex: 1 },
    {
      field: "edit",
      headerName: "",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <EditButton bookData={params.row} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <DeleteButton isbn={params.row.isbn} />
      ),
    },
  ];
  return (
    <div
      style={{
        paddingLeft: Layout.standardPaddingLarge,
        paddingRight: Layout.standardPaddingLarge,
      }}
    >
      <div style={{ paddingBottom: Layout.standardPaddingLarge }}>
        <BookshelfHeader />
        <TextField
          label="Seach Title/Author"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "10px" }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <NewBookButton />
      </div>
      <div style={{ height: 800 }}>
        {/* <Bookshelf books={books} /> */}
        <DataGrid
          rows={filteredBooks}
          columns={columns}
          checkboxSelection={false}
          density="standard"
          getRowId={(row) => row.isbn}
        />
      </div>
    </div>
  );
};

export default PageDashboard;
