import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const Watchlist = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get('/movies');
        setMovies(res.data);
      } catch (err) {
        setError('Failed to load your watchlist: ' + err.message);
      } finally {
        setLoading(false)
      }
    }
    fetchMovies();
    document.title = "My Watchlist";
  }, []);

  // Clicking on a movie card navigates to its details page
  const handleMovieClick = (imdbID) => {
        navigate(`/movie/${imdbID}`);
    };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  };

  if (error) { 
    return (
      <div className="container mt-4 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  };

  if (movies.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h3>Your watchlist is empty.</h3>
        <p>Search for movies and add them to your list!</p>
      </div>
    )
  };
  

  return (
    <div className="container my-5">
      <h1 className="mb-5" style={{ color: "white" }}>My Watchlist</h1>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-3 my-4 p-4">
            <div className="card h-100 shadow-sm" 
            style={{ cursor: "pointer", transition: 'transform 0.2s ease-in-out' }} 
            onClick={() => handleMovieClick(movie.imdbID)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={movie.poster !== 'N/A' ? movie.poster : '/placeholder.jpg'}
                className="card-img-top"
                alt={movie.title}
              />
              
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.year}</p>
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className="mb-2">
                    <span className="badge bg-warning text-dark">
                      ⭐ {movie.imdbRating}
                    </span> <small className="text-muted">IMDB</small>
                  </div>
                )}
                <br/>
                <button
                  onClick={async (event) => {
                    event.preventDefault();  
                    event.stopPropagation(); 
                    await API.delete(`/movies/${movie._id}`)
                    setMovies(movies.filter((m) => m._id !== movie._id))
                    alert(`"${movie.title}" has been removed from your watchlist successfully.`);
                  }}
                  className="btn btn-danger w-100"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Watchlist;