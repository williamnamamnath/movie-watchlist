import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

const DetailsPage = () => {

  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const fullRes = await API.get(`/movies/details/${id}`)
        setMovie(fullRes.data)

        if (user) {
          const list = await API.get('/movies')
          const found = list.data.some((m) => m.imdbID === id)
          setInWatchlist(found)
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails();
    document.title = movie ? `${movie.Title} - Details` : 'Details';
  }, [id, user]);

  // Function to add movies to the user's watchlist
  const handleAdd = async () => {
    try {
      await API.post('/movies', {
        title: movie.Title,
        year: movie.Year,
        imdbID: movie.imdbID,
        poster: movie.Poster,
        type: movie.Type,
      });
      setInWatchlist(true);
      alert(`"${movie.Title}" has been added to your watchlist successfully.`);
    } catch (err) {
      alert('Failed to add movie to watchlist: ' + err.message);
    }
  };

  // Function to remove movies from the user's watchlist
  const handleRemove = async () => {
    try {
      const list = await API.get('/movies');
      const found = list.data.find((m) => m.imdbID === id);

      if (found) {
        await API.delete(`/movies/${found._id}`);
        setInWatchlist(false);
      }
      alert(`"${movie.Title}" has been removed from your watchlist successfully.`);

    } catch (err) {
      alert('Failed to remove movie from watchlist: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ color: "black" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  };

  if (error) {
    return (
      <div className="container mt-4 text-center" style={{ color: "black" }}>
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  };


  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="col-md-4 text-center my-5">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
            alt={movie.Title}
            className="img-fluid rounded shadow"
          />
          {user && (
            <div className="mt-4">
              {inWatchlist ? (
                <button className="btn btn-danger w-75" onClick={handleRemove}>
                  Remove from Watchlist
                </button>
              ) : (
                <button className="btn btn-success w-75" onClick={handleAdd}>
                  + Add to Watchlist
                </button>
              )}
            </div>
          )}
        </div>

        <div className="col-md-8 my-5">
          <h2>{movie.Title}</h2>
          <hr className='mb-4'/>
          <p className="text-dark">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Summary:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> <span className="badge bg-warning text-dark me-2">
                        ⭐ {movie.imdbRating}
                      </span></p>
        </div>
      </div>
    </div>
  )
};

export default DetailsPage;
