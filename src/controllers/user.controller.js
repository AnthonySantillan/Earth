const passport = require('passport');
const pool = require('../config/database');


const User={}

User.postUser= async (req, res) => {
    const { name, email, description } = req.body;
    const newUser = {
        name,
        email,
        description
    };
    await pool.query('INSERT INTO users set ?', [newUser]);
    req.flash('success', 'Usuario guardado correctamente');
    res.redirect('/links');
};
  
User.getUser=  async (req, res) => {

    const users = await pool.query('SELECT *FROM users');

    res.render('Pages/users/users-services/users-services', { users });


};




module.exports=User