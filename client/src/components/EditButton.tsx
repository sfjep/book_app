import React from "react";
import { useNavigate } from "react-router-dom";

type EditButtonProps = {
  isbn: string;
};

const EditButton = ({ isbn }: EditButtonProps) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${isbn}`);
  };

  return <button onClick={handleEditClick}>Edit</button>;
};

export default EditButton;
