const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../config/database');
const { isLoggedIn } = require('../lib/auth');



  router.get('/signin', (req, res) => {
    res.render('auth/signin');
  });

  router.post('/signin', passport.authenticate('local.signin', {
 
    
      successRedirect: '/profile',
      failureRedirect: '/signin',
      failureFlash: true
    
  }));


  router.get('/signup', (req, res) => {
    res.render('auth/signup');
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/profile', (req, res) => {
    // console.log(req.body);

    res.send('profile');
  });

module.exports = router;