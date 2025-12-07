import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../api';
import "../styles.css";

const RandomMovies = ({ onAdd }) => {
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRandomMovies = async () => {
            try {
                setLoading(true);
                const response = await API.get('/movies/random');
                setMovies(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRandomMovies();
    }, []);

        // Function to add movies to the user's watchlist
        const handleAdd = async (movie) => {
        try {
        const res = await API.post('/movies', movie)
        onAdd(res.data)
        } catch (err) {
        if (err.status === 400)
            alert('This movie is already in your watchlist.')
        else
            alert('Failed to add movie. Please sign in to add movies to your watchlist.')
        console.log(err.response);
        }
        
    };

    // Clicking on a movie card navigates to its details page
    const handleMovieClick = (imdbID) => {
        navigate(`/movie/${imdbID}`);
    };

    if (loading) {
        return (
            <div className="text-center mt-4 mb-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading random movies...</span>
                </div>
            </div>
        )
    };
    
    if (error) {
        return <div className="alert alert-warning text-center mt-4">Could not load random movies</div>;
    };

    const handleRefresh = async () => {
        try {
            setLoading(true);
            const response = await API.get('/movies/random');
            setMovies(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="my-5 p-2">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="my-3" style={{ color: "black" }}>Discover Movies</h2>
                <span 
                    className="btn"
                    onClick={handleRefresh}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Loading...
                        </>
                    ) : (
                        <>
                            <span className="btn" style={{ backgroundColor: "#1d2d44", color: "white" }}>Refresh</span>
                        </>
                    )}
                </span>
            </div>

            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div 
                            className="card h-100"
                            style={{ 
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                backgroundColor: "#EBEBEB",
                                boxShadow: 'none'
                            }}
                            onClick={() => handleMovieClick(movie.imdbID)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 16px #1d2d44';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <img 
                                src={movie.poster !== 'N/A' ? movie.poster : '/placeholder-movie.jpg'} 
                                alt={movie.title}
                                className="card-img-top"
                                style={{ 
                                  height: '300px', 
                                  objectFit: 'contain',
                                  backgroundColor: '#EBEBEB'
                                }}
                            />
                            <div className="card-body">
                                <h6 className="card-title text-primary">{movie.title}</h6>
                                <p className="card-text text-muted">{movie.year}</p>
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
                                    className="btn btn-success w-75 mb-3"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleAdd({
                                        title: movie.title,
                                        year: movie.year,
                                        imdbID: movie.imdbID,
                                        poster: movie.poster,
                                        type: movie.type,
                                        })
                                    }}
                                    >
                                    + Add to Watchlist
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default RandomMovies;