import { useEffect, useState } from 'react';
import API from '../api';

import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import RandomMovies from '../components/RandomMovies';
import Intro from '../components/Intro';
import SpacingTop from '../components/SpacingTop';
import SpacingBottom from '../components/SpacingBottom';

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
      <SpacingTop /> 
      <div className="d-flex justify-content-center">
        <div className="rounded p-2 mb-5 mt-5" style={{ maxWidth: '40vw', minWidth: '300px', width: '100%'}}>
          <h1 className="text-center mb-3" style={{ color: "black" }}>Welcome to 
            <br/>
            <span style={{ color: "#f77f00" }}>Movie Watchlist</span></h1>
            <p className="intro-description text-center">
                    Your personal movie companion for discovering, tracking, and organizing your favorite films.
                </p>
                <SpacingBottom />
          <Intro />
          <br/>
        </div>
      </div>
      
      <div className="d-flex justify-content-center">
        <div className="p-2 my-5" style={{ maxWidth: '40vw', minWidth: '300px', width: '100%' }}>
          <h2 className="text-center my-3" style={{ color: "black" }}>Search for Movies</h2>
          <SearchBar onSearch={handleSearch} />
          <br/>
        </div>
      </div>
      

      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-dark" role="status">
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