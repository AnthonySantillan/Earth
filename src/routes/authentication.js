const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../config/database');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
  });

  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/profile', (req, res) => {
    // console.log(req.body);

    res.send('profile');
  });

module.exports = router;