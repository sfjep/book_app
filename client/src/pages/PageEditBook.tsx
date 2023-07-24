import React, { ChangeEvent, useState, useEffect } from "react";
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
import { RatedBook } from "../types/Book";
import { Colors, FontConfig, Layout } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import { editBook } from "../redux/books/booksSlice";

const PageEditBook = () => {
  const { isEditBookDialogOpen, setIsEditBookDialogOpen, editingBook } =
    useDialogContext();

  const dispatch = useAppDispatch();

  // Using React state to handle the form inputs
  const [bookData, setBookData] = useState<RatedBook | null>(null);

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
      try {
        await dispatch(editBook(bookData));
        setIsEditBookDialogOpen(false);
      } catch (error) {
        console.error("An error occurred while updating the book:", error);
      }
    }
  };

  return (
    <Dialog
      open={isEditBookDialogOpen}
      onClose={() => setIsEditBookDialogOpen(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        style={{ ...FontConfig.Heading2, color: Colors.textPrimary }}
      >
        Edit Book
      </DialogTitle>
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
        <Button
          onClick={handleSubmit}
          style={{
            ...FontConfig.Button,
            color: Colors.primary,
            padding: Layout.standardPaddingLarge,
          }}
        >
          Confirm
        </Button>
        <Button
          style={{
            ...FontConfig.Button,
            color: Colors.secondary,
            padding: Layout.standardPaddingLarge,
          }}
          onClick={() => setIsEditBookDialogOpen(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(PageEditBook);
