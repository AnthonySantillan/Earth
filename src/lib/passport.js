const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const orm = require('../config/database');
const pool = require('../config/database');
const helpers = require("../lib/helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {

    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const { name } = req.body;

      const newUser = {
        email,
        password,
        name
      };
      newUser.password = await helpers.encryptPassword(password);

      const result = await pool.query('INSERT INTO users SET ?', [newUser]);
      console.log(result);
    }
  )
);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});