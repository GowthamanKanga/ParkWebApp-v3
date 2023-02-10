const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const messageModel = mongoose.model("messageModel",messageSchema)

module.exports = messageModel