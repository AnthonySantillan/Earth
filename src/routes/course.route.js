const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

const pool = require('../config/database');

router.get('/course-list', isLoggedIn, (req, res) => {
    res.render('Pages/course-type/courses/courses-list');
});

module.exports = router;