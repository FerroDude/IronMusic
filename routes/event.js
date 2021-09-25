const express = require('express');

// const bcryptjs = require('bcryptjs');
const Event = require('./../models/event');
const routeGuard = require('./../middleware/route-guard');
const upload = require('./../middleware/file-upload');

const eventRouter = express.Router();

eventRouter.get('/', routeGuard, (req, res, next) => {
  console.log(req.user);
  const userID = req.user._id;
  Event.find({ creator: userID }).then((events) => {
    console.log('-------here' + events);
    res.render('event/list', { events });
    // return Event.find({ creator: userID }).sort({ date: -1 });
  });
});

eventRouter.get('/add', routeGuard, (req, res, next) => {
  res.render('event/create');
});

eventRouter.post(
  '/add',
  routeGuard,
  upload.single('images'),
  (req, res, next) => {
    const location = [
      {
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        coordinates: [req.body.longitude, req.body.latitude]
      }
    ];
    const { title, venue, date, description } = req.body;
    let images;
    if (req.file) {
      images = [req.file.path];
    }
    Event.create({
      title,
      location,
      venue,
      date,
      description,
      images,
      creator: req.user._id
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
);

eventRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('event/edit');
});

eventRouter.get('/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)

    .then((event) => {
      console.log(event);
      res.render('event/detail', { event });
      // return Comment.find({ event: id }).populate('creator');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = eventRouter;
