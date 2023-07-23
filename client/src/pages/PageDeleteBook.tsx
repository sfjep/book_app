import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";
import { useDialogContext } from "../contexts/DialogContext";

const PageDeleteBook = ({ books, setBooks }) => {
  const { isDeleteBookDialogOpen, setIsDeleteBookDialogOpen, deletingBook } =
    useDialogContext();

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${APIConfig.baseURL}${APIConfig.endpoints.deleteBook(deletingBook)}`
      );
      setBooks(books.filter((book) => book.isbn !== deletingBook));
      setIsDeleteBookDialogOpen(false);
    } catch (error) {
      console.error("An error occurred while deleting the book:", error);
    }
  };

  const handleCancel = () => {
    setIsDeleteBookDialogOpen(false);
  };

  return (
    <Dialog
      open={isDeleteBookDialogOpen}
      onClose={handleCancel}
      className="dialog-overlay"
    >
      <DialogTitle>Are you sure that you want to delete this book?</DialogTitle>
      <DialogActions>
        <Button color="secondary" onClick={handleConfirmDelete}>
          Delete
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(PageDeleteBook);
