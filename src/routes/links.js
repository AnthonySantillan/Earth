const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/user', (req,res) => {
    res.render('users/add');
});
router.post('/user', (req,res) => {
    res.send('receive');
});
module.exports = router;