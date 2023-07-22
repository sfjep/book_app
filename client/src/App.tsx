import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageDashboard from "./pages/PageDashboard";
import PageDeleteBook from "./pages/PageDeleteBook";
import PageAddBookDialog from "./pages/PageAddBookDialog";
import PageEditBook from "./pages/PageEditBook";
import { DialogProvider } from "./contexts/DialogContext";

const App = () => {
  return (
    <DialogProvider>
      <PageAddBookDialog />
      <PageDeleteBook />
      <PageEditBook />
      <Router>
        <Routes>
          <Route path="/" element={<PageDashboard />} />
          {/* Add other routes here as you create them */}
        </Routes>
      </Router>
    </DialogProvider>
  );
};

export default App;
