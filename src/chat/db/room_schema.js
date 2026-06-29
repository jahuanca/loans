
const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    participants: [{
        type: Number,
        required: true,
    }],
    lastMessage: {
        type: String,
        default: '',
    },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    unreadCount: {
        type: Number,
        default: 0,
    },
}, {timestamps: true})

module.exports = mongoose.model('Room', roomSchema)