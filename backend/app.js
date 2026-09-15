require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;
