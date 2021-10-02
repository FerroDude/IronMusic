'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
require('dotenv').config();
// console.log(process.env);
const User = require('../models/user');
// TicketMaster API Key
const ticketmasterApiKey = process.env.TICKETMASTER_API_KEY;
const ticketmasterSecret = process.env.TICKETMASTER_SECRET;

// Require the TicketMaster package to make API calls:
const TM = require('ticketmaster');

// Gogle Maps API Key
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Other routes
router.get('/', (req, res, next) => {
  User.find({ isArtist: true })
    .limit(3)
    .then((artists) => {
      res.render('home', { title: 'Iron Music!', artists });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

router.get('/search', (req, res, next) => {
  res.render('search');
});

router.get('/search-results', (req, res, next) => {
  const searchTerm = req.query.artist;
  const params = {
    keyword: searchTerm
  };
  TM(ticketmasterApiKey)
    .discovery.v2.event.all(params)
    .then((result) => {
      console.log(result.items[0].dates);
      res.render('search-results', {
        result
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
