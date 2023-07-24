import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { deleteBook } from "../redux/books/booksSlice";
import { Colors, FontConfig } from "../constants";
import { useDialogContext } from "../contexts/DialogContext";

const PageDeleteBook = () => {
  const { isDeleteBookDialogOpen, setIsDeleteBookDialogOpen, deletingBook } =
    useDialogContext();

  // useAppDispatch is used to dispatch actions to our Redux store.
  const dispatch = useAppDispatch();

  const handleConfirmDelete = async () => {
    try {
      if (deletingBook !== null) {
        await dispatch(deleteBook(deletingBook));
      }
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
      <DialogTitle
        style={{ ...FontConfig.Heading2, color: Colors.textPrimary }}
      >
        Delete Book
      </DialogTitle>
      <DialogTitle style={{ ...FontConfig.BodyLarge }}>
        Are you sure that you want to delete this book?
      </DialogTitle>
      <DialogActions>
        <Button
          style={{ ...FontConfig.BodyMedium, color: Colors.primary }}
          onClick={handleConfirmDelete}
        >
          Delete
        </Button>
        <Button
          style={{ ...FontConfig.BodyMedium, color: Colors.secondary }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(PageDeleteBook);
