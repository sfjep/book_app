import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIConfig } from "../constants/APIConfig";

const PageDeleteBook = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${APIConfig.baseURL}${APIConfig.endpoints.deleteBook(isbn!)}`
      );
      navigate("/");
    } catch (error) {
      console.error("An error occurred while deleting the book:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <p>Are you sure that you want to delete this book?</p>
      <button onClick={handleConfirmDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default PageDeleteBook;
