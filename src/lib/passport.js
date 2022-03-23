const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const orm = require('../config/database')
const sql = require('../config/dataBase.orm')
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await orm.usuario.findOne({ where: { username: username } });
      if (rows) {
        const user = rows;
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("message", "Welcome" + " " + user.username));
        } else {
          done(null, false, req.flash("message", "Data incorrect"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "The username does not exist.")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const usuarios = await orm.usuario.findOne({ where: { username: username } });
      if (usuarios === null) {
        const { contador, numeroUsuario, rolNumero } = req.body
        let nuevoDetalleROL = {
          usuarioIdUsuarios: numeroUsuario,
          RolIdRol: rolNumero
        }
        let nuevoUsuario = {
          username,
          password
        };
        let nuevoContador = {
          contador
        }
        nuevoUsuario.password = await helpers.encryptPassword(password);
        const resultado = await orm.usuario.create(nuevoUsuario);
        nuevoUsuario.id = resultado.insertId;
        await orm.detalleRol.create(nuevoDetalleROL)
        await orm.contador.create(nuevoContador)
        return done(null, nuevoUsuario);
      } else {
        if (usuarios) {
          const usuario = usuarios
          if (username == usuario.username) {
            done(null, false, req.flash("message", "Username already exist."))
          } else {
            const { contador, numeroUsuario, rolNumero } = req.body
            let nuevoUsuario = {
              username,
              password
            };
            let nuevoDetalleROL = {
              usuarioIdUsuarios: numeroUsuario,
              RolIdRol: rolNumero
            }
            let nuevoContador = {
              contador
            }
            nuevoUsuario.password = await helpers.encryptPassword(password);
            const resultado = await orm.usuario.create(nuevoUsuario);
            nuevoUsuario.id = resultado.insertId;
            await orm.detalleRol.create(nuevoDetalleROL)
            await orm.contador.create(nuevoContador)
            return done(null, nuevoUsuario);
          }
        }
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});