const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');
const auth = require('../middleware/auth');


// Movie routes
router.get('/search', controller.search);
router.get('/details/:imdbID', controller.getDetails);
router.get('/random', controller.getRandomMovies);

// CRUD operations on movies in watchlist
router.get('/', auth, controller.list);
router.post('/', auth, controller.add);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;