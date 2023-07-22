import React from "react";
import { Button } from "@mui/material";
import { FontConfig } from "../constants";
import { Colors } from "../constants/Colors";
import { useDialogContext } from "../contexts/DialogContext";

type DeleteButtonProps = {
  isbn: string;
};

const DeleteButton = ({ isbn }: DeleteButtonProps) => {
  const { setIsDeleteBookDialogOpen } = useDialogContext();

  const handleClick = () => {
    setIsDeleteBookDialogOpen(true);
  };

  return (
    <Button
      onClick={handleClick}
      style={{ ...FontConfig.Button, backgroundColor: Colors.secondary }}
      variant="contained"
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
