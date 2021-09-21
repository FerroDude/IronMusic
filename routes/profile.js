'use strict';

// const { profileRouter } = require('express');
const express = require('express');

// const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const upload = require('./../middleware/file-upload');

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
  '/upload-file',
  routeGuard,
  upload.single('audio'),
  (req, res, next) => {
    const id = req.user._id;
    let audio;
    if (req.file) {
      audio = req.file.path;
    }
    User.findByIdAndUpdate(id, {
      audio
    })
      .then(() => {
        res.redirect('/profile');
        console.log(req.user);
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = profileRouter;
