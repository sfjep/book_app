import { render, screen, fireEvent, within } from "@testing-library/react";
import Sort from "./Sort";

describe("Sort component", () => {
  test("should render reset Sort component", () => {
    render(<Sort filteredBooks={[]} setSortedBooks={() => {}} />);
    // Assert that the component renders without any errors
    expect(screen.getByText("Reset Sort")).toBeInTheDocument();
  });

  test("should apply primary sort", () => {
    const filteredBooks = [
      {
        title: "Book B",
        author: "Author B",
        avg_rating: 4.2,
        publication_year: 2019,
        num_ratings: 50,
      },
      {
        title: "Book A",
        author: "Author A",
        avg_rating: 4.5,
        publication_year: 2020,
        num_ratings: 100,
      },
    ];
    const setSortedBooks = jest.fn();
    render(
      <Sort filteredBooks={filteredBooks} setSortedBooks={setSortedBooks} />
    );

    // Simulate selecting "Title" as primary sort
    const primarySortSelect = screen.getAllByRole("button")[0]; // Create first select
    fireEvent.mouseDown(primarySortSelect); // Click the primary sort to open list

    const listbox = within(screen.getByRole("listbox")); // get listbox and
    fireEvent.click(listbox.getByText(/Title/i)); // select "Title" option

    // Assert that the setSortedBooks function is called with the sorted books
    expect(setSortedBooks).toHaveBeenCalledWith(filteredBooks);
  });
});
