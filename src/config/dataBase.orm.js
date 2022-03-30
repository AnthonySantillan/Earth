const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "ArquitectosEarth";

mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Database created or verified successfully");
    })
})

const usersModel = require('../models/users.model');

const rolesModel = require('../models/roles.model');

const servicesModel = require ('../models/services.model');

const notificationsModel = require ('../models/notifications.model');

const messagesModel = require('../models/messages.model');

const sequelize = new Sequelize(
  'ArquitectosEarth',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Connect')
  })
  .catch(err => {
    console.log('No connect')
  })

sequelize.sync({ force: false })
  .then(() => {
    console.log("synchronized tables")
  })

const users = usersModel(sequelize, Sequelize);

const roles = rolesModel(sequelize, Sequelize);

const notifications = notificationsModel(sequelize, Sequelize);

const messages = messagesModel(sequelize, Sequelize);

const services = servicesModel(sequelize, Sequelize);

//Relaciones 
roles.hasMany(users)
users.belongsTo(roles)

roles.hasMany(services)
services.belongsTo(roles)

module.exports = {
  users,
  roles,
  notifications,
  messages,
  services,
}