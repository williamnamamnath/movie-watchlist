const Movie = require('../models/Movie');
const { searchMovies, getMovieByImdbID } = require('../services/omdbService');


// Handler function to search movies via OMDB API
exports.search = async (req, res) => {
  try {
    const { q, page } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'q query required' });
    };
    
    const data = await searchMovies(q, page || 1);
    
    if (data && data.Search) {
      const enhancedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          try {
            const details = await getMovieByImdbID(movie.imdbID);
            return {
              ...movie,
              imdbRating: details.imdbRating || 'N/A',
              Genre: details.Genre || '',
              Plot: details.Plot || '',
              Director: details.Director || '',
              Runtime: details.Runtime || ''
            };
          } catch (err) {
            if (err) {
              return {
                ...movie,
                imdbRating: 'N/A'
              }
            };
          }
        })
      );
      
      res.json({
        ...data,
        Search: enhancedMovies
      });
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Handler function to get movie details
exports.getDetails = async (req, res) => {
  try {
    const { imdbID } = req.params;
    const data = await getMovieByImdbID(imdbID);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Handler function to get random movies (return 4 random movies)
exports.getRandomMovies = async (req, res) => {
  try {
    const popularGenres = [
      'action', 'comedy', 'thriller', 'adventure', 'drama', 'horror', 'sci-fi', 'romance', 'animation', 'fantasy'
    ];
    
    const randomTerm = popularGenres[Math.floor(Math.random() * popularGenres.length)];
    
    const searchResults = await searchMovies(randomTerm, 1);
    
    if (searchResults && Array.isArray(searchResults.Search) && searchResults.Search.length) {
      const pool = [...searchResults.Search];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      const selected = pool.slice(0, 4);

      const moviePromises = selected.map(async (movie) => {
        try {
          const detailsResponse = await getMovieByImdbID(movie.imdbID);
          return {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            type: movie.Type,
            imdbID: movie.imdbID,
            imdbRating: detailsResponse.imdbRating || 'N/A',
            genre: detailsResponse.Genre || '',
            plot: detailsResponse.Plot || ''
          };
        } catch (err) {
          return {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            type: movie.Type,
            imdbID: movie.imdbID,
            imdbRating: 'N/A',
            genre: '',
            plot: ''
          };
        }
      });

      const movies = await Promise.all(moviePromises);
      res.json(movies);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Handler function for the user's current watchlist movies
exports.list = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    const enhancedMovies = await Promise.all(
      movies.map(async (movie) => {
        try {
          const details = await getMovieByImdbID(movie.imdbID);
          return {
            ...movie.toObject(),
            imdbRating: details.imdbRating || movie.imdbRating || 'N/A',
            poster: details.Poster && details.Poster !== 'N/A' ? details.Poster : movie.poster
          };
        } catch (err) {
          if (err) {

            return {
              ...movie.toObject(),
              imdbRating: movie.imdbRating || 'N/A'
            }
          };
        }
      })
    );
    
    res.json(enhancedMovies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Handler function to add a movie to the user's watchlist
exports.add = async (req, res) => {
  try {
    const { title, year, imdbID, imdbRating, poster, type, notes } = req.body;
    
    if (!imdbID || !title) {
      return res.status(400).json({ message: 'title and imdbID required' });
    };

    const existing = await Movie.findOne({ imdbID, user: req.user.id });

    if (existing) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    };

    const movie = new Movie({ 
      user: req.user.id, 
      title, 
      year, 
      imdbID, 
      imdbRating,
      poster, 
      type, 
      notes 
    });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Handler function to update a movie in the user's watchlist
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOneAndUpdate(
      { _id: id, user: req.user.id }, 
      req.body, 
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Not found' });
    };

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Handler function to delete a movie from the user's watchlist
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOneAndDelete({ _id: id, user: req.user.id });
    
    if (!movie) {
      return res.status(404).json({ message: 'Not found' });
    };

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}