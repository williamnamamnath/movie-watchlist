const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
year: String,
imdbID: { type: String, required: true },
poster: String,
type: String,
notes: String,
watched: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});

MovieSchema.index({ user: 1, imdbID: 1 }, { unique: true });

module.exports = mongoose.model('Movie', MovieSchema);