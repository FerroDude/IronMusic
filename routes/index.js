'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Iron Music!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

router.get('/search', (req, res, next) => {
  res.render('search');
});

router.get('/search-results', (req, res, next) => {
  res.render('search-results');
});

module.exports = router;
