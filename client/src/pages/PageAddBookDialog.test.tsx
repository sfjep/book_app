import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DialogContext } from "../contexts/DialogContext";
import PageAddBookDialog from "../pages/PageAddBookDialog";
import axios from "axios";

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Create a mock function for setBooks
const setBooks = jest.fn();

// Mock the context value
const contextValue = {
  isAddBookDialogOpen: true,
  setIsAddBookDialogOpen: jest.fn(),
  isDeleteBookDialogOpen: false,
  setIsDeleteBookDialogOpen: jest.fn(),
  isEditBookDialogOpen: false,
  setIsEditBookDialogOpen: jest.fn(),
  editingBook: null,
  setEditingBook: jest.fn(),
  deletingBook: null,
  setDeletingBook: jest.fn(),
};

describe("PageAddBookDialog", () => {
  test("renders correctly", () => {
    render(
      <DialogContext.Provider value={contextValue}>
        <PageAddBookDialog books={[]} setBooks={setBooks} />
      </DialogContext.Provider>
    );

    // Check if DialogTitle is in document
    expect(screen.getByText("Add a New Book")).toBeInTheDocument();

    // Check if Text fields are present in document
    expect(screen.getByLabelText("ISBN")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Author")).toBeInTheDocument();
    expect(screen.getByLabelText("Publication Year")).toBeInTheDocument();
    expect(screen.getByLabelText("Publisher")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL Small")).toBeInTheDocument();

    // Check if buttons are in document
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("adds a book when the Add button is clicked", async () => {
    // Set up the mock implementation for axios.post
    mockedAxios.post.mockResolvedValueOnce({
      data: { id: 1, title: "New Book" },
    });

    render(
      <DialogContext.Provider value={contextValue}>
        <PageAddBookDialog books={[]} setBooks={setBooks} />
      </DialogContext.Provider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Book" },
    });

    // Click the Add button
    fireEvent.click(screen.getByText("Add"));

    // Use waitFor to wait for setBooks to have been called
    await waitFor(() => {
      expect(setBooks).toHaveBeenCalledTimes(1);
    });

    // And it should have been called with the new book
    expect(setBooks).toHaveBeenCalledWith([{ id: 1, title: "New Book" }]);
  });
});
