import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";
import { useDialogContext } from "../contexts/DialogContext";

const PageDeleteBook = () => {
  const { isbn } = useParams();
  const { isDeleteBookDialogOpen, setIsDeleteBookDialogOpen } =
    useDialogContext();

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${APIConfig.baseURL}${APIConfig.endpoints.deleteBook(isbn!)}`
      );
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

export default PageDeleteBook;
