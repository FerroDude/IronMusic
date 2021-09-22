'use strict';

// const { profileRouter } = require('express');
const express = require('express');

// const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const upload = require('./../middleware/file-upload');
const audioUpload = require('./../middleware/audio-file-upload');
const Audio = require('./../models/audio');

const profileRouter = express.Router();

profileRouter.get('/', routeGuard, (req, res, next) => {
  console.log(req.user);
  res.render('profile/detail');
});

profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('profile/edit');
});

profileRouter.post(
  '/edit',
  routeGuard,
  upload.single('picture'),
  (req, res, next) => {
    const { name, email, isArtist, description } = req.body;
    const id = req.user._id;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    User.findByIdAndUpdate(id, {
      name,
      email,
      isArtist,
      picture,
      description
    })
      .then((document) => {
        res.redirect(`/profile`);
        // res.redirect(`/profile/${id}`);
        // res.redirect('./../private');
      })
      .catch((error) => {
        next(error);
      });
  }
);

profileRouter.post(
  '/upload-audio',
  audioUpload.single('audio'),
  (req, res, next) => {
    const songtitle = req.body.songtitle;
    const audioURL = req.file.path;
    Audio.create({
      songtitle,
      audio: audioURL
    })
      .then((audiofile) => {
        console.log(audiofile);
        res.redirect('/profile');
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = profileRouter;
