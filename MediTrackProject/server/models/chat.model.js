const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      ],
    },
    { timestamps: true }
  );


module.exports = mongoose.model('Chat', ChatSchema);