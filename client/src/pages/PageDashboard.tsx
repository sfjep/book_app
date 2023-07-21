import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

interface Book {
  isbn: string;
  title: string;
  author: string;
  publication_year: string;
  publisher: string;
  avg_rating: number;
  num_ratings: number;
}

const PageDashboard = () => {
  console.log("PageDashboard rendered");

  const [books, setBooks] = useState<Book[]>([]);

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

  const columns = [
    { field: "isbn", headerName: "ISBN", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "publication_year", headerName: "Publication Year", width: 200 },
    { field: "publisher", headerName: "Publisher", width: 200 },
    { field: "avg_rating", headerName: "Average Rating", width: 200 },
    { field: "num_ratings", headerName: "Number of Ratings", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <EditButton isbn={params.row.isbn} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <DeleteButton isbn={params.row.isbn} />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={books}
        columns={columns}
        checkboxSelection={false}
        getRowId={(row) => row.isbn}
      />
    </div>
  );
};

export default PageDashboard;
