import {Message} from '../models/message.model';

// Send a message in a chat
const sendMessage = async (user, chat, content) => {
    return await Message.create({
        sender: user._id,
        chat: chat._id,
        content: content
    });
};

module.exports = {
    sendMessage
};
