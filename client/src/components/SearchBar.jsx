import { CiSearch } from "react-icons/ci";
import "../styles/SearchBar.css";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="searchBar">
      <div className="inputContainer">
        <input
          className="searchInput"
          type="text"
          onChange={handleChange}
          value={search}
          placeholder="Search for posts..."
        />
        <CiSearch className="iconSearch" />
      </div>
    </div>
  );
}

export default SearchBar;
