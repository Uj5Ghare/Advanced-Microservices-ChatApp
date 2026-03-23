const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logger
const logger = require('./logger');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.API_GATEWAY_PORT || 3000;

app.listen(PORT, () => {
  logger.info(`API Gateway listening on port ${PORT}`);
});

module.exports = app;