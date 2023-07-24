import { Link } from "react-router-dom";
import { DataGrid, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { RatedBook } from "../types/Book";

const Bookshelf = ({ books }: { books: RatedBook[] }) => {
  const columns: GridColDef[] = [
    {
      field: "image_url_m",
      headerName: "Book cover",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.row.image_url_s}
          alt={params.row.title}
          style={{ width: "100%", height: "auto" }}
        />
      ),
      headerAlign: "center",
    },
    {
      field: "isbn",
      headerName: "ISBN",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 2,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/author/${params.row.author}`}>{params.row.author}</Link>
      ),
    },
    { field: "publisher", headerName: "Publisher", flex: 2 },
    {
      field: "publication_year",
      headerName: "Publication Year",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "avg_rating",
      headerName: "Average Rating",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "num_ratings",
      headerName: "Number of Ratings",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "edit",
      headerName: "",
      flex: 1,
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <EditButton bookData={params.row} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      flex: 1,
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <DeleteButton isbn={params.row.isbn} />
      ),
    },
  ];

  return (
    <DataGrid
      rows={books}
      columns={columns}
      checkboxSelection={false}
      density="comfortable"
      getRowId={(row) => row.isbn}
    />
  );
};

export default Bookshelf;
