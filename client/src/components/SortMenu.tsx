import { Select, MenuItem } from "@mui/material";

const SortMenu = ({ value, onChange, label }) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      style={{ marginRight: 20 }}
    >
      <MenuItem value="None">None</MenuItem>
      <MenuItem value="Title">Title</MenuItem>
      <MenuItem value="Author">Author</MenuItem>
      <MenuItem value="Rating">Rating</MenuItem>
      <MenuItem value="PublicationYear">PublicationYear</MenuItem>
      <MenuItem value="NumberRatings">NumberRatings</MenuItem>
    </Select>
  );
};

export default SortMenu;
