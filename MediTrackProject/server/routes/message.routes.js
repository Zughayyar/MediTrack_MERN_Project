const express = require('express');
const messageController = require('../controllers/message.controller');
const authenticate = require('../middleware/authenticate');


module.exports = app => {

    app.post('/api/messages/send', authenticate, messageController.sendMessage);
    app.get('/api/messages/all', authenticate, messageController.getAllMessages);
    app.get('/api/messages/:id', authenticate, messageController.getMessageById);

}