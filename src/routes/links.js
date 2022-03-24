const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/user', (req, res) => {
    res.render('users/add');
});
router.post('/user', async (req, res) => {
    const { name, email, description } = req.body;
    const newUser = {
        name,
        email,
        description
    };
    await pool.query('INSERT INTO users set ?', [newUser]);
    res.redirect('/links');
});

router.get('/', async (req, res) => {

    const users = await pool.query('SELECT *FROM users');

    //    console.log(users);
    res.render('users/list', { users });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE ID = ?', [id]);
    res.redirect('/links');

});


module.exports = router;