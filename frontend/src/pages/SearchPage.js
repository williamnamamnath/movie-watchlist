import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import API from '../api';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    document.title = "Search Movies - Movie Watchlist";
    const query = searchParams.get('q');
    if (query) {
      handleSearch(query);
    }
  }, [searchParams]);

  // Function to handle movie search results
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setSearchParams({ q: query });

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
    <>
    <div className="container">
      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger text-center mx-5">{error}</div>}

      {!loading && !error && results.length > 0 && (
        <SearchResults
        results={results}
        searchQuery={searchQuery}
        onAdd={(movie) => console.log('Added movie:', movie)}
        />
      )}

      {!loading && !error && searchQuery && results.length === 0 && (
          <div className="text-center mt-5">
          <p className="text-muted">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
    </>
  );
};

export default SearchPage;
