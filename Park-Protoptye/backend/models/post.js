const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    messages : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messageModel',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    }
})

const postModel = mongoose.model("postModel",postSchema)

module.exports = postModel