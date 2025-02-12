const express = require('express');
const chatController = require('../controllers/chat.controller');
const authenticate = require('../middleware/authenticate');

module.exports = app => {

    app.post('/api/chats/create', authenticate, chatController.createChat);
    app.get('/api/chats/all', authenticate, chatController.getAllChats);
    app.get('/api/chats/:id', authenticate, chatController.getChatById);

}
