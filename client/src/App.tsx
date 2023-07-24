import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  PageDashboard,
  PageDeleteBook,
  PageAddBookDialog,
  PageEditBook,
  PageAuthor,
} from "./pages";
import { DialogProvider } from "./contexts/DialogContext";
import { useAppDispatch } from "./redux/hooks";
import { fetchBooks } from "./redux/books/booksSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks({}));
  }, [dispatch]);

  return (
    <DialogProvider>
      <PageAddBookDialog />
      <PageDeleteBook />
      <PageEditBook />
      <Router>
        <Routes>
          <Route path="/" element={<PageDashboard />} />
          <Route path="/author/:name" element={<PageAuthor />} />
        </Routes>
      </Router>
    </DialogProvider>
  );
};

export default App;
