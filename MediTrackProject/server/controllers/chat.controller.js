import { Chat } from '../models/chat.model';

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

module.exports = {
    initiateChat,
    getAllChatsForUser
};

