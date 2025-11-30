const axios = require('axios');

const OMDB_BASE = 'http://www.omdbapi.com/';
const apiKey = process.env.OMDB_API_KEY;

if (!apiKey) {
  console.log('OMDB_API_KEY not set. Search endpoints will fail until you add it.');
};

async function searchMovies(query, page = 1) {
  if (!apiKey) {
      throw new Error('OMDB_API_KEY not configured')
    };

  const params = { apikey: apiKey, s: query, page };

  const res = await axios.get(OMDB_BASE, { params });
  return res.data;
};

async function getMovieByImdbID(imdbID) {
  if (!apiKey) {
    throw new Error('OMDB_API_KEY not configured')
  };

  const params = { apikey: apiKey, i: imdbID, plot: 'full' };

  const res = await axios.get(OMDB_BASE, { params });
  return res.data;
};

module.exports = { searchMovies, getMovieByImdbID };