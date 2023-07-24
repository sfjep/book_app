import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { FontConfig, Colors } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import { fetchBooks } from "../redux/books/booksSlice";

const BackendFilter = () => {
  const dispatch = useAppDispatch();
  const [authorFilter, setAuthorFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  // Filter by querying all books with potential for author and title filtering
  const filterBooksBackend = () => {
    try {
      dispatch(fetchBooks({ author: authorFilter, title: titleFilter }));
    } catch (error) {
      console.error("An error occurred while fetching the books:", error);
    }
  };

  return (
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
          onClick={filterBooksBackend}
          style={{
            ...FontConfig.Button,
            backgroundColor: Colors.primary,
            width: 200,
          }}
        >
          Filter Books (BE)
        </Button>
      </Box>
    </div>
  );
};

export default BackendFilter;
