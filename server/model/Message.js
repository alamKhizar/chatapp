const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
    {
        senderId:
        {
             type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        reciverId:
        {
             type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        message:'String'

    }
)

module.export = mongoose.model('Message',MessageSchema)

