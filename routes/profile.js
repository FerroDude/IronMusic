'use strict';

// const { profileRouter } = require('express');
const express = require('express');

// const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const upload = require('./../middleware/file-upload');
const audioUpload = require('./../middleware/audio-file-upload');
const Audio = require('./../models/audio');
const Follow = require('../models/follow');

const profileRouter = express.Router();

profileRouter.get('/', routeGuard, (req, res, next) => {
  const user = req.user._id;
  let audio;
  let follow;

  Audio.find({ creator: user })
    .limit(5)
    .then((audioResult) => {
      audio = audioResult;
      return Follow.find({ follower: user });
    })
    .then((followResult) => {
      const artistIds = [];
      followResult.forEach((artist) => {
        artistIds.push(artist.artist);
      });
      return artistIds;
    })
    .then((artistIdResult) => {
      return User.find({ _id: { $in: artistIdResult } });
    })
    .then((artists) => {
      follow = artists;
      res.render('profile/detail', { audio, follow });
    })
    .catch((error) => {
      next(error);
    });
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
    const creatorID = req.user._id;
    Audio.create({
      songtitle,
      audio: audioURL,
      creator: creatorID
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
