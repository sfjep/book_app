import React from "react";
import { Button } from "@mui/material";
import { FontConfig, Layout } from "../constants";
import { Colors } from "../constants/Colors";
import { useDialogContext } from "../contexts/DialogContext";

const NewBookButton = () => {
  const { setIsAddBookDialogOpen } = useDialogContext();

  const handleClick = () => {
    setIsAddBookDialogOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        paddingRight: Layout.standardPaddingLarge,
      }}
    >
      <Button
        variant="contained"
        onClick={handleClick}
        style={{
          ...FontConfig.Button,
          backgroundColor: Colors.primary,
          width: 200,
        }}
      >
        Add Book!
      </Button>
    </div>
  );
};

export default NewBookButton;
