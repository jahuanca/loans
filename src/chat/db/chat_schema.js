
const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    readBy: [{
        type: String,
        required: true,
    }]

}, { timestamps: true })

module.exports = mongoose.model('Chat', chatSchema)