'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
require('dotenv').config();
// console.log(process.env);

// TicketMaster API Key
const ticketmasterApiKey = process.env.TICKETMASTER_API_KEY;
const ticketmasterSecret = process.env.TICKETMASTER_SECRET;

// Require the TicketMaster package to make API calls:
const TM = require('ticketmaster');

// Other routes
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
  const searchTerm = req.query.artist.toString;
  console.log(searchTerm);
  TM(ticketmasterApiKey)
    .discovery.v2.event.all(searchTerm)
    .then((result) => {
      console.log(result);
      res.render('search-results', {
        result
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
