// components/Search.tsx

import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <TextField
        label="Search Title/Author"
        onChange={handleSearch}
        style={{ flexGrow: 1 }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
    </div>
  );
};

export default Search;
