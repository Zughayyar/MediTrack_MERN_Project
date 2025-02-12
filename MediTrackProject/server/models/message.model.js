const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema(
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
      },
      message: {
        type: String,
        required: [true, 'Message content is required.'],
      }
    },
    { timestamps: true }
  );


  module.exports = mongoose.model('Message', MessageSchema);