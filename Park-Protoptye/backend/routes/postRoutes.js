const post = require('../models/post')

const express = require('express')

const app = express.Router()

app.post('/posts', (req, res) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      messages: req.body.messages
    });
  
    post.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Post created successfully');
      }
    });
  });
  
  app.get('/posts', (req, res) => {
    post.find({}, (err, posts) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(posts);
      }
    });
  });
  
  app.patch('/posts/:id', (req, res) => {
    post.findByIdAndUpdate(req.params.id, {$set: {title: req.body.title, content: req.body.content}}, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Post updated successfully');
      }
    });
  });
  
  app.delete('/posts/:id', (req, res) => {
    post.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Post deleted successfully');
      }
    });
  });
  
  /*app.patch('/posts/:id/messages', (req, res) => {
      post.findByIdAndUpdate(req.params.id, {$push: {messages: {author: req.body.author, message: req.body.message}}}, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Messages deleted  successfully")
  
      }
    })
})*/

app.get('/posts/:id', (req, res) => {
  post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(500).send(err);
    } else if (!post) {
      res.status(404).send({ message: 'Post not found' });
    } else {
      res.status(200).send(post.messages);
    }
  });
});

module.exports = app