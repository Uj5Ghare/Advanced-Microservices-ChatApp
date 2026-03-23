const express = require('express');
const router = express.Router();
const axios = require('axios');
const logger = require('../logger');
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:8080';

router.post('/login', async (req, res) => {
    try {
        logger.info('Login request received');
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        logger.error('Login error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        logger.info('Register request received');
        const response = await axios.post(`${AUTH_SERVICE_URL}/register`, req.body);
        res.json(response.data);
    } catch (error) {
        logger.error('Register error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.post('/verify', async (req, res) => {
    try {
        logger.info('Verify token request received');
        const response = await axios.post(`${AUTH_SERVICE_URL}/verify`, req.body);
        res.json(response.data);
    } catch (error) {
        logger.error('Verify token error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

module.exports = router;