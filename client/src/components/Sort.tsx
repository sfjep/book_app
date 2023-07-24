import React, { useEffect, useState, useCallback } from "react";
import { Button, Select, MenuItem } from "@mui/material";
import { Colors, FontConfig } from "../constants";
import SortMenu from "./SortMenu";

const Sort = ({ filteredBooks, setSortedBooks }) => {
  const [primarySort, setPrimarySort] = useState({
    field: "None",
  });
  const [secondarySort, setSecondarySort] = useState({
    field: "None",
  });

  // Apply sorting to the filtered books
  const handleSort = useCallback(() => {
    // Create a copy to avoid mutating state directly
    let sortedBooks = [...filteredBooks];

    // Define sorting logic for each field
    const sortLogic = {
      Title: (a, b) => a.title.localeCompare(b.title), // alphabetical
      Author: (a, b) => a.author.localeCompare(b.author), // alphabetical
      Rating: (a, b) => b.avg_rating - a.avg_rating, // descending
      PublicationYear: (a, b) => b.publication_year - a.publication_year, // descending
      NumberRatings: (a, b) => b.num_ratings - a.num_ratings, // descending,
    };

    // Apply primary sort
    if (primarySort.field !== "None") {
      sortedBooks.sort(sortLogic[primarySort.field]);
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
    setPrimarySort({ field: "None" });
    setSecondarySort({ field: "None" });
  };

  return (
    <div>
      <SortMenu
        value={primarySort.field}
        onChange={(value) => setPrimarySort({ ...primarySort, field: value })}
      />
      <SortMenu
        value={secondarySort.field}
        onChange={(value) =>
          setSecondarySort({ ...secondarySort, field: value })
        }
      />
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
