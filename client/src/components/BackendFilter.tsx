// components/Filter.tsx

import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import { FontConfig, Colors, APIConfig } from "../constants";

const BackendFilter = ({ setBooks }) => {
  const [authorFilter, setAuthorFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

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
