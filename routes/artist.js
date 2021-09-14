'use strict';

const Router = require('express');

const artistRouter = new Router();

artistRouter.get('/search', (req, res) => {
  res.render('artist/search');
});

module.exports = artistRouter;
