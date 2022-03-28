const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../config/database');
const { isLoggedIn } = require('../lib/auth');



  router.get('/signin', (req, res) => {
    res.render('auth/signin');
  });

  router.post('/signin', (req, res, next) => {
 
    passport.authenticate('local.signin', {
      successRedirect: '/profile',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);

    
  });


  router.get('/signup', (req, res) => {
    res.render('auth/signup');
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
  });

  router.get('/profile', (req, res) => {
    // console.log(req.body);

    res.render('Pages/user-profile/user-profile');
  });

module.exports = router;