'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const logger = require('../logger');

const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL || 'http://chat-service:8083';

router.get('/messages', async (req, res) => {
    try {
        logger.info('Get all messages request');
        const response = await axios.get(`${CHAT_SERVICE_URL}/messages`);
        res.json(response.data);
    } catch (error) {
        logger.error('Get messages error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.get('/conversations/:id', async (req, res) => {
    try {
        logger.info(`Get messages for conversation ${req.params.id}`);
        const response = await axios.get(`${CHAT_SERVICE_URL}/conversations/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        logger.error('Get conversation error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.post('/messages', async (req, res) => {
    try {
        logger.info('Send message request');
        const response = await axios.post(`${CHAT_SERVICE_URL}/messages`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        logger.error('Send message error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.post('/conversations', async (req, res) => {
    try {
        logger.info('Create conversation request');
        const response = await axios.post(`${CHAT_SERVICE_URL}/conversations`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        logger.error('Create conversation error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.delete('/messages/:id', async (req, res) => {
    try {
        logger.info(`Delete message ${req.params.id}`);
        const response = await axios.delete(`${CHAT_SERVICE_URL}/messages/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        logger.error('Delete message error:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

module.exports = router;
