const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../config/database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');



  router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
  });

  router.post('/signin',isNotLoggedIn, (req, res, next) => {
 
    passport.authenticate('local.signin', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);

    
  });


  router.get('/signup',isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/logout', isNotLoggedIn,(req, res) => {
    req.logOut();
    res.redirect('/signin');
  });

  router.get('/profile',isLoggedIn, (req, res) => {
    // console.log(req.body);

    res.render('Pages/user-profile/user-profile');
  });

module.exports = router;