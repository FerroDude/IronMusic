'use strict';
const User = require('../models/user');

const Router = require('express');

const artistRouter = new Router();

artistRouter.get('/search', (req, res, next) => {
  User.find({ isArtist: true })
    .then((artists) => {
      res.render('artist/search', { artists });
    })
    .catch((error) => {
      next(error);
    });
});

artistRouter.get('/search-results', (req, res, next) => {
  const { artist } = req.query;
  console.log(artist);
  User.findOne({ name: artist })
    .then((result) => {
      console.log(result);
      res.render('artist/search-results', { result });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = artistRouter;
