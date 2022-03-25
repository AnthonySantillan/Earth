const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const orm = require('../config/dataBase.orm');
const pool = require('../config/dataBase');
const helpers = require("../lib/helpers");


passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);

    if (validPassword) {
      done(null, user, req.flash('success','Bienvenido ' + user.name));
    } else {
      done(null, false, req.flash('message','Contraseña Incorecta'));
    }

  }else{
return done(null, false, req.flash('message','El email no existe'));
  }
}));

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
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});