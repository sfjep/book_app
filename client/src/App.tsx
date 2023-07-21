import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageDashboard from "./pages/PageDashboard";
import PageDeleteBook from "./pages/PageDeleteBook";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageDashboard />} />
        <Route path="/delete/:isbn" element={<PageDeleteBook />} />

        {/* Add other routes here as you create them */}
      </Routes>
    </Router>
  );
};

export default App;
