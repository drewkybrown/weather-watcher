import React, { useState } from "react";

const SearchBar = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      // Call the onSearchSubmit function with the search term
      onSearchSubmit(searchTerm);
      setSearchTerm(""); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter city or ZIP code"
        className="input-class" // Replace with Tailwind class later
      />
      <button type="submit" className="button-class">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
