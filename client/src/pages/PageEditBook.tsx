// PageEditBook.tsx
import React, { ChangeEvent, useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Box,
} from "@mui/material";
import { useDialogContext } from "../contexts/DialogContext";
import { Book } from "../types/Book";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";

const PageEditBook = () => {
  const { isEditBookDialogOpen, setIsEditBookDialogOpen, editingBook } =
    useDialogContext();

  // Using React state to handle the form inputs
  const [bookData, setBookData] = useState<Book | null>(null);

  // Populate bookData state when editingBook changes
  useEffect(() => {
    setBookData(editingBook);
  }, [editingBook]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBookData({
      ...bookData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (bookData) {
      const updatedBookData: Book = {
        isbn: bookData.isbn,
        title: bookData.title,
        author: bookData.author,
        publication_year: bookData.publication_year,
        publisher: bookData.publisher,
        image_url_s: bookData.image_url_s,
        image_url_m: bookData.image_url_m,
        image_url_l: bookData.image_url_l,
      };
      try {
        await axios.put(
          `${APIConfig.baseURL}${APIConfig.endpoints.updateBook(
            bookData.isbn
          )}`,
          bookData
        );
        window.location.reload();
      } catch (error) {
        console.error(error.response);
      }
    }
    setIsEditBookDialogOpen(false);
  };

  return (
    <Dialog
      open={isEditBookDialogOpen}
      onClose={() => setIsEditBookDialogOpen(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        {bookData && (
          <>
            <Box margin={2}>
              <TextField
                label="ISBN"
                name="isbn"
                value={bookData.isbn}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <TextField
                label="Title"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <TextField
                label="Author"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <TextField
                label="Publication Year"
                name="publication_year"
                value={bookData.publication_year}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <TextField
                label="Publisher"
                name="publisher"
                value={bookData.publisher}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <TextField
                label="Small Image URL (Optional)"
                name="image_url_s"
                value={bookData.image_url_s}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <TextField
                label="Medium Image URL (Optional)"
                name="image_url_m"
                value={bookData.image_url_m}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <TextField
                label="Large Image URL (Optional)"
                name="image_url_l"
                value={bookData.image_url_l}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
        <Button onClick={() => setIsEditBookDialogOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PageEditBook;
