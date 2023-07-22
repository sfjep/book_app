import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const Bookshelf = (books: any[]) => {
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
    <DataGrid
      rows={books}
      columns={columns}
      checkboxSelection={false}
      density="standard"
      getRowId={(row) => row.isbn}
    />
  );
};

export default Bookshelf;
