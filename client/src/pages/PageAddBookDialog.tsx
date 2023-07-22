import React, { useContext, useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";
import { useDialogContext } from "../contexts/DialogContext";
import "../styles/DialogOverlay.css";

const PageAddBookDialog = () => {
  const [newBook, setNewBook] = useState({
    isbn: "",
    title: "",
    author: "",
    publication_year: "",
    publisher: "",
    // other fields here...
  });

  const { isAddBookDialogOpen, setIsAddBookDialogOpen } = useDialogContext();

  const handleClose = () => {
    setIsAddBookDialogOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAdd = async () => {
    try {
      await axios.post(
        `${APIConfig.baseURL}${APIConfig.endpoints.createBook}`,
        newBook
      );
      setIsAddBookDialogOpen(false);
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
    }
  };

  return (
    <Dialog
      open={isAddBookDialogOpen}
      onClose={handleClose}
      classes={{ root: "dialog-root" }}
    >
      <DialogTitle>Add a New Book</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="isbn"
          label="ISBN"
          type="text"
          fullWidth
          variant="standard"
          value={newBook.isbn}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="publication_year"
          label="Publication Year"
          type="text"
          fullWidth
          variant="standard"
          value={newBook.publication_year}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="publisher"
          label="Publisher"
          type="text"
          fullWidth
          variant="standard"
          value={newBook.publisher}
          onChange={handleInputChange}
        />
        {/* Add other fields here as you create them */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PageAddBookDialog;
