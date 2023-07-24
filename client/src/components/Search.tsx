import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const Search = ({ setSearchTerm }: SearchProps) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
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
