const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photos = require("./photos.js");
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  comment: {
    type: String,
    default: "Something went wrong..."
  },
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

// Add a comment
router.post("/:id", validUser, upload.none(), async (req, res) => {
  const photo = await Photo.findOne({
    _id: req.params.id
  });
  if (!photo) {
    return res.status(403).send({
      message: "invalid photo id"
    });
  }
  console.log(req.body);
  let comment = new Comment({
      comment: req.body.comment,
      user: req.user,
      photo: photo,
    });
  console.log(comment);
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

// Get all comments for a photo
router.get("/:id", async (req, res) => {
  const photo = await Photo.findOne({
    _id: req.params.id
  });
  if (!photo) {
    return res.status(403).send({
      message: "invalid photo id"
    });
  }
  try {
    let comments = await Comment.find({
      photo: photo
    }).populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}
