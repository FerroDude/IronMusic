const express = require('express');

// const bcryptjs = require('bcryptjs');
const Event = require('./../models/event');
const routeGuard = require('./../middleware/route-guard');
const upload = require('./../middleware/file-upload');

const eventRouter = express.Router();

// Gogle Maps API Key
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;

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

eventRouter.get('/edit/:id', routeGuard, (req, res, next) => {
  res.render('event/edit');
});

eventRouter.get('/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)

    .then((event) => {
      // console.log(event);
      // console.log(event.location[0].coordinates[1]);
      res.render('event/detail', { event });
      // return Comment.find({ event: id }).populate('creator');
    })
    .catch((error) => {
      next(error);
    });
});

eventRouter.post('/delete', (req, res, next) => {
  const eventId = req.body.eventId;
  console.log(req.body);
  console.log(req.body.eventId);
  Event.findOneAndDelete({
    _id: eventId
  })
    .then(() => {
      console.log('Event deleted successfully');
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = eventRouter;
