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
  const regex = new RegExp(escapeRegex(artist), 'gi');
  User.find({ name: regex, isArtist: true })
    .then((result) => {
      res.render('artist/search-results', { result });
    })
    .catch((error) => {
      next(error);
    });
});

artistRouter.get('/public/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .then((result) => {
      console.log(result);
      res.render('artist/public', { result });
    })
    .catch((error) => {
      next(error);
    });
});

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

module.exports = artistRouter;
