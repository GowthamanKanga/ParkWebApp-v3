const Message = require('../models/message');
const express = require('express');
const router = express.Router();

// Create a new message
const createMessage = async (authorId, message) => {
const newMessage = new Message({
author: authorId,
message: message,
});
await newMessage.save();
return newMessage;
};

// Get all messages
const getAllMessages = async () => {
return await Message.find();
};

// Get a message by ID
const getMessageById = async (id) => {
return await Message.findById(id);
};

// Update a message by ID
const updateMessageById = async (id, update) => {
return await Message.findByIdAndUpdate(id, update);
};

// Delete a message by ID
const deleteMessageById = async (id) => {
return await Message.findByIdAndDelete(id);
};

// Create a new message
router.post('/', async (req, res) => {
const authorId = req.body.authorId;
const message = req.body.message;
const newMessage = await createMessage(authorId, message);
res.json(newMessage);
});

// Get all messages
router.get('/', async (req, res) => {
const messages = await getAllMessages();
res.json(messages);
});

// Get a message by ID
router.get('/:id', async (req, res) => {
const id = req.params.id;
const message = await getMessageById(id);
res.json(message);
});

// Update a message by ID
router.patch('/:id', async (req, res) => {
const id = req.params.id;
const update = req.body;
const updatedMessage = await updateMessageById(id, update);
res.json(updatedMessage);
});

// Delete a message by ID
router.delete('/:id', async (req, res) => {
const id = req.params.id;
const deletedMessage = await deleteMessageById(id);
res.json(deletedMessage);
});

module.exports = router;