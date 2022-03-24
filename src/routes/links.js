const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/user', (req,res) => {
    res.render('users/add');
});
router.post('/user', async (req,res) => {
   const { name, email, description }= req.body;
   const newUser = {
    name,
    email,
    description
   };
   await pool.query('INSERT INTO users set ?', [newUser]);
    res.send('receive');
});
module.exports = router;