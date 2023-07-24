// App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  PageDashboard,
  PageDeleteBook,
  PageAddBookDialog,
  PageEditBook,
  PageAuthor,
} from "./pages";
import { DialogProvider } from "./contexts/DialogContext";
import { Book } from "./types/Book";
import axios from "axios";
import { APIConfig } from "./constants";

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>(
          `${APIConfig.baseURL}${APIConfig.endpoints.getAllBooks}`
        );
        setBooks(response.data);
        console.log("Books:", response.data);
      } catch (error) {
        console.error("An error occurred while fetching the books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <DialogProvider>
      <PageAddBookDialog books={books} setBooks={setBooks} />
      <PageDeleteBook books={books} setBooks={setBooks} />
      <PageEditBook books={books} setBooks={setBooks} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PageDashboard books={books} setBooks={setBooks} />}
          />
          <Route path="/author/:name" element={<PageAuthor />} />
        </Routes>
      </Router>
    </DialogProvider>
  );
};

export default App;
