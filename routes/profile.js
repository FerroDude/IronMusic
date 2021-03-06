'use strict';

// const { profileRouter } = require('express');
const express = require('express');

// const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const Event = require('../models/event');
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
  let followers;
  let events;

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
      return Follow.find({ artist: user });
    })
    .then((artistResult) => {
      const followersIds = [];
      artistResult.forEach((follower) => {
        followersIds.push(follower.follower);
      });
      return followersIds;
    })
    .then((followersIdResult) => {
      return User.find({ _id: { $in: followersIdResult } });
    })
    .then((finalFollowers) => {
      followers = finalFollowers;
      return Event.find({ creator: user });
    })
    .then((eventResult) => {
      events = eventResult;

      res.render('profile/detail', { audio, follow, followers, events });
    })
    .catch((error) => {
      next(error);
    });
});

//res.render('profile/detail', { audio, follow, followers });

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

profileRouter.post('/delete-audio', (req, res, next) => {
  const songId = req.body.audioId;
  console.log(req.body);
  console.log(req.body.audioId);
  Audio.findOneAndDelete({
    _id: songId
  })
    .then(() => {
      console.log('Audio file deleted successfully');
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = profileRouter;
