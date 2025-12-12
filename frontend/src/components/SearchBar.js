import { useState } from 'react';
import "../styles.css";

const SearchBar = ({ onSearch }) => {
    
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center my-2">
      <input
        type="text"
        className="form-control w-50 me-2"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <button type="submit" className="btn" style={{ backgroundColor: "#1d2d44", color: "white" }}>
        Search
      </button>
    </form>
  )
};

export default SearchBar;