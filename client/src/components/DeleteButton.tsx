import React from "react";
import { useNavigate } from "react-router-dom";

type DeleteButtonProps = {
  isbn: string;
};

const DeleteButton = ({ isbn }: DeleteButtonProps) => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    navigate(`/delete/${isbn}`);
  };

  return <button onClick={handleDeleteClick}>Delete</button>;
};

export default DeleteButton;
