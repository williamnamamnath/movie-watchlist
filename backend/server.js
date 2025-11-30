const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));