import { useNavigate } from 'react-router-dom';
import API from '../api';

const SearchResults = ({ results, searchQuery, onAdd }) => {
  
  const navigate = useNavigate();

  // Function to add movies to the user's watchlist
  const handleAdd = async (movie) => {
    try {
      const res = await API.post('/movies', movie)
      onAdd(res.data)      
      alert(`"${movie.title}" has been added to your watchlist successfully.`);
    } catch (err) {
      if (err.status === 400)
        alert('This movie is already in your watchlist.')
      else
        alert('Failed to add movie. Please sign in to add movies to your watchlist.')
    }
  };
  
  // Clicking on a movie card navigates to its details page
  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  if (!results || results.length === 0) {
    return <p className="text-center text-muted mt-4">No movies found.</p>
  };


  return (
    <div className="container my-5 p-4">
      <div className="row">
        <h2 className="my-5" style={{ color: "white" }}>Search Results for "{searchQuery}"</h2>
        {results.map((movie) => (
          <div key={movie.imdbID} className="col-md-3 mb-4">
            <div 
              className="card h-100 shadow-sm" 
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                minHeight: '450px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
                className="card-img-top"
                alt={movie.Title}
                onClick={() => handleMovieClick(movie.imdbID)}
                style={{ 
                  cursor: 'pointer',
                  height: '300px',
                  objectFit: 'contain',
                  backgroundColor: '#f8f9fa'
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 
                    className="card-title text-primary"
                    onClick={() => handleMovieClick(movie.imdbID)}
                    style={{ cursor: 'pointer' }}
                  >
                    {movie.Title}
                  </h5>
                  <p className="card-text text-muted">{movie.Year}</p>
                  {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-warning text-dark me-2">
                        ⭐ {movie.imdbRating}
                      </span>
                      <small className="text-muted">IMDB</small>
                    </div>
                  )}
                </div>
                
                <div className="d-flex justify-content-center">
                  <button
                      className="btn btn-success w-75 my-3"
                      onClick={(e) => {
                          e.stopPropagation();
                          handleAdd({
                          title: movie.Title,
                          year: movie.Year,
                          imdbID: movie.imdbID,
                          imdbRating: movie.imdbRating,
                          poster: movie.Poster,
                          type: movie.Type,
                          })
                      }}
                      >
                      + Add to Watchlist
                  </button>
              </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default SearchResults;