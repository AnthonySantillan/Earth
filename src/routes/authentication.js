const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../config/database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const users = require('../models/users.model');



router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, async (req, res, next) => {

  passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
 /*  const {  email} = req.body;

  await pool.query("SELECT roleId FROM users WHERE email=? ", [email], function (err, row, field) {
    console.log(roleId);
    if (row[0].roleId == 1) {
      res.send({ 'success': true, 'role': row[0].roleId, 'user': row[0].email });
    } else if (row[0].roleId == 2) {
      res.send({ 'success': true, 'role': row[0].roleId, 'user': row[0].email });
      console.log(row[0].roleId)
    } else if (row[0].roleId == 3) {
      res.send({ 'success': true, 'role': row[0].roleId, 'user': row[0].email });


    }
  }); */



});

/* function obtenerMenu() {
  var menu = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [],
    },


  ]

  console.log(user.roleId);

  if (users.roleId === 1) {
    menu[0].submenu.unshift(
      { titulo: 'Inicio', url: '/' },
      { titulo: 'USUARIOS', url: '/' },


    );


  }


} */


router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/signin');
});

router.get('/profile', isLoggedIn, (req, res) => {
  // console.log(req.body);

  res.render('Pages/user-profile/user-profile');
});
router.get('/edit-profile', isLoggedIn, (req, res) => {
  // console.log(req.body);

  res.render('Pages/user-profile/edit-profile');
});

module.exports = router;