'use strict';
const User = require('../models/user');
const Follow = require('../models/follow');
const Audio = require('../models/audio');
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
  const artistId = req.params.id;
  let artist;
  let follow;
  let audio;
  let followerNumber;
  User.findById(artistId)
    .then((artistResult) => {
      artist = artistResult;
      return Audio.find({ creator: artistId }).limit(5);
    })
    .then((audioResult) => {
      audio = audioResult;
      return Follow.find({ artist: artistId });
    })
    .then((artistFollowers) => {
      followerNumber = artistFollowers.length;
      if (!req.session.userId) {
        res.render('artist/public', { artist, audio });
      } else {
        const user = req.user.id;
        return Follow.find({ follower: user, artist: artistId });
      }
    })
    .then((followDocument) => {
      follow = followDocument;
      res.render('artist/public', { artist, audio, follow, followerNumber });
    })
    .catch((error) => {
      next(error);
    });
});

//The following lines add the follow logic, it should bu ran only in the last .then
/*       if (!req.session.userId) {
        res.render('artist/public', { artist, audio });
      } else {
        const user = req.user.id;
        return Follow.find({ follower: user, artist: artistId });
      }
    })
    .then((followDocument) => {
      follow = followDocument;
      res.render('artist/public', { artist, audio, follow });
    */

artistRouter.post('/follow/:id', (req, res, next) => {
  const artist = req.params.id;
  const follower = req.user.id;
  Follow.create({ follower, artist });
  res.redirect(`/artist/public/${artist}`);
});

artistRouter.post('/unfollow/:id', (req, res, next) => {
  const artist = req.params.id;
  const follower = req.user.id;
  Follow.findOneAndDelete({ follower, artist })
    .then(() => {
      res.redirect(`/artist/public/${artist}`);
    })
    .catch((error) => {
      next(error);
    });
});

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

module.exports = artistRouter;
