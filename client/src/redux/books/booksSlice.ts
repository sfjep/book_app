import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { APIConfig } from "../../constants";
import { RatedBook, Book } from "../../types/Book";

// 1. Get all books with potential author and title filters
export const fetchBooks = createAsyncThunk<
  RatedBook[],
  { author?: string; title?: string }
>("books/fetchBooks", async (filters) => {
  const response = await axios.get<RatedBook[]>(
    `${APIConfig.baseURL}${APIConfig.endpoints.getAllBooks}`,
    {
      params: {
        author: filters.author || undefined,
        title: filters.title || undefined,
      },
    }
  );
  return response.data;
});

// 2. Delete a book
export const deleteBook = createAsyncThunk<string, string>(
  "books/deleteBook",
  async (isbn) => {
    await axios.delete(
      `${APIConfig.baseURL}${APIConfig.endpoints.deleteBook}/${isbn}`
    );
    return isbn;
  }
);

// 3. Edit a book
export const editBook = createAsyncThunk<RatedBook, RatedBook>(
  "books/editBook",
  async (book) => {
    const response = await axios.put<RatedBook>(
      `${APIConfig.baseURL}${APIConfig.endpoints.updateBook}/${book.isbn}`,
      book
    );
    return response.data;
  }
);

// 4. Add a book
export const addBook = createAsyncThunk<Book, Book>(
  "books/addBook",
  async (newBook: Book) => {
    const response = await axios.post<Book>(
      `${APIConfig.baseURL}${APIConfig.endpoints.createBook}`,
      newBook
    );
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: [] as RatedBook[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<RatedBook[]>) => {
          return action.payload;
        }
      )
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        return state.filter((book) => book.isbn !== action.payload);
      })
      .addCase(
        editBook.fulfilled,
        (state, action: PayloadAction<RatedBook>) => {
          return state.map((book) =>
            book.isbn === action.payload.isbn ? action.payload : book
          );
        }
      )
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.push(action.payload);
      });
  },
});

export default booksSlice.reducer;
