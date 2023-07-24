// components/Sort.tsx

import React, { useEffect, useState, useCallback } from "react";
import { Button, Select, MenuItem } from "@mui/material";
import { Colors, FontConfig } from "../constants";

const Sort = ({ filteredBooks, setSortedBooks }) => {
  const [primarySort, setPrimarySort] = useState({
    field: "None",
    direction: "asc",
  });
  const [secondarySort, setSecondarySort] = useState({
    field: "None",
    direction: "asc",
  });

  // Apply sorting to the filtered books
  const handleSort = useCallback(() => {
    // Create a copy to avoid mutating state directly
    let sortedBooks = [...filteredBooks];

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
  }, [filteredBooks, primarySort, secondarySort]);

  // Call handleSort whenever primarySort, secondarySort or filteredBooks changes
  useEffect(() => {
    const sortedBooks = handleSort();
    setSortedBooks(sortedBooks); // lift the sorted books up to the parent component
  }, [handleSort, setSortedBooks]);

  // Reset the sort
  const resetSort = () => {
    setPrimarySort({ field: "None", direction: "asc" });
    setSecondarySort({ field: "None", direction: "asc" });
  };

  return (
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
        <MenuItem value="NumberRatings">NumberRatings</MenuItem>{" "}
      </Select>
      <Button
        variant="contained"
        onClick={resetSort}
        style={{
          ...FontConfig.Button,
          backgroundColor: Colors.primary,
          width: 200,
        }}
      >
        Reset Sort
      </Button>
    </div>
  );
};

export default Sort;
