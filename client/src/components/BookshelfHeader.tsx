import { FontConfig, Colors } from "../constants";

const BookshelfHeader = () => {
  return (
    <h1 style={{ ...FontConfig.Heading1, color: Colors.textPrimary }}>
      Bookshelf
    </h1>
  );
};

export default BookshelfHeader;
