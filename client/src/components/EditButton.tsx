import React from "react";
import { Button } from "@mui/material";
import { FontConfig } from "../constants";
import { Colors } from "../constants/Colors";
import { useDialogContext } from "../contexts/DialogContext";
import { Book } from "../types/Book";

type EditButtonProps = {
  bookData: Book;
};

const EditButton = ({ bookData }: EditButtonProps) => {
  const { setIsEditBookDialogOpen, setEditingBook } = useDialogContext();

  const handleClick = () => {
    setEditingBook(bookData);
    setIsEditBookDialogOpen(true);
  };

  return (
    <Button
      variant="contained"
      style={{ ...FontConfig.Button, backgroundColor: Colors.secondary }}
      onClick={handleClick}
    >
      Edit
    </Button>
  );
};

export default EditButton;
