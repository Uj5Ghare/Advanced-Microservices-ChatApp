const express = require('express');
const router = express.Router();
const axios = require('axios');
const logger = require('../logger');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:8082';

router.get('/', async (req, res) => {
    try {
        logger.info('Get all users request');
        const response = await axios.get(`${USER_SERVICE_URL}/users`);
        res.json(response.data);
    } catch (error) {
        logger.error('Get users error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        logger.info(`Get user ${req.params.id}`);
        const response = await axios.get(`${USER_SERVICE_URL}/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        logger.error('Get user error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        logger.info('Create user request');
        const response = await axios.post(`${USER_SERVICE_URL}/users`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        logger.error('Create user error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        logger.info(`Update user ${req.params.id}`);
        const response = await axios.put(`${USER_SERVICE_URL}/users/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        logger.error('Update user error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        logger.info(`Delete user ${req.params.id}`);
        const response = await axios.delete(`${USER_SERVICE_URL}/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        logger.error('Delete user error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

module.exports = router;