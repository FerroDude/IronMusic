const express = require('express');

// const bcryptjs = require('bcryptjs');
const Event = require('./../models/event');
const routeGuard = require('./../middleware/route-guard');
const upload = require('./../middleware/file-upload');

const eventRouter = express.Router();

eventRouter.get('/', routeGuard, (req, res, next) => {
  res.render('event/list');
});

eventRouter.get('/add', routeGuard, (req, res, next) => {
  res.render('event/create');
});

eventRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('event/edit');
});

eventRouter.get('/:id', routeGuard, (req, res, next) => {
  res.render('event/detail');
});

module.exports = eventRouter;
