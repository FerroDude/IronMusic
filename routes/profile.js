'use strict';

// const { profileRouter } = require('express');
const express = require('express');

// const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const upload = require('./../middleware/file-upload');

const profileRouter = express.Router();

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
        // res.redirect(`/profile/${id}`);
        res.redirect('./../private');
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = profileRouter;
