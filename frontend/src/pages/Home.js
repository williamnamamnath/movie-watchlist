import { useEffect, useState } from 'react';
import API from '../api';

import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import RandomMovies from '../components/RandomMovies';
import Intro from '../components/Intro';

const Home = () => {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = "Home - Movie Watchlist";
  }, []);

  // Function to handle movie search results
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const res = await API.get(`/movies/search?q=${encodeURIComponent(query)}`);
      setResults(res.data.Search || []);
    } catch (err) {
      setError('Failed to fetch search results: ' + err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="border rounded p-2 my-5 shadow-sm" style={{ maxWidth: '40vw', minWidth: '300px', width: '100%', border: '1px solid #1d2d44' }}>
          <h1 className="text-center my-3" style={{ color: "white" }}>Welcome to <span style={{ color: "#ffc371" }}>Movie Watchlist</span></h1>
          <Intro />
          <br/>
        </div>
      </div>
      
      <div className="d-flex justify-content-center">
        <div className="border rounded p-2 my-5 shadow-sm" style={{ maxWidth: '40vw', minWidth: '300px', width: '100%', border: '1px solid #1d2d44' }}>
          <h2 className="text-center my-3" style={{ color: "white" }}>Search for Movies</h2>
          <SearchBar onSearch={handleSearch} />
          <br/>
        </div>
      </div>
      

      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}


      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && results.length > 0 && (
        <SearchResults
        results={results}
        searchQuery={searchQuery}
        onAdd={(movie) => console.log('Added movie:', movie)}
        />
      )}

      <RandomMovies />
    </div>
  )
};

export default Home;