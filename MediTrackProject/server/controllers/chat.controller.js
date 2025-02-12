const Chat = require('../models/chat.model');

// Initiate chat between assistant and patient if it doesn't exist
const initiateChat = async (patient, assistant) => {
    let chat = await Chat.findOne({ participants: { $all: [patient._id, assistant._id] } });
    if (!chat) {
        chat = await Chat.create({ participants: [patient._id, assistant._id] });
    }
    return chat;
};

// Get all chats for a user
const getAllChatsForUser = async (userId) => {
    const chats = await Chat.find({ participants: userId });
    return chats;
};

const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        const chat = new Chat({ participants });
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.user._id }).populate('participants', 'name');
        res.status(200).json(chats);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    initiateChat,
    getAllChatsForUser,
    createChat,
    getAllChats
};

