import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { RatedBook } from "../types/Book";

type DialogContextType = {
  isAddBookDialogOpen: boolean;
  setIsAddBookDialogOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteBookDialogOpen: boolean;
  setIsDeleteBookDialogOpen: Dispatch<SetStateAction<boolean>>;
  isEditBookDialogOpen: boolean;
  setIsEditBookDialogOpen: Dispatch<SetStateAction<boolean>>;
  editingBook: RatedBook | null;
  setEditingBook: Dispatch<SetStateAction<RatedBook | null>>;
  deletingBook: string | null;
  setDeletingBook: Dispatch<SetStateAction<string | null>>;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export const DialogProvider = ({ children }: Props) => {
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [isDeleteBookDialogOpen, setIsDeleteBookDialogOpen] = useState(false);
  const [isEditBookDialogOpen, setIsEditBookDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<RatedBook | null>(null);
  const [deletingBook, setDeletingBook] = useState<string | null>(null);

  return (
    <DialogContext.Provider
      value={{
        isAddBookDialogOpen,
        setIsAddBookDialogOpen,
        isDeleteBookDialogOpen,
        setIsDeleteBookDialogOpen,
        isEditBookDialogOpen,
        setIsEditBookDialogOpen,
        editingBook,
        setEditingBook,
        deletingBook,
        setDeletingBook,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};
