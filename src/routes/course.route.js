const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

const pool = require('../config/database');

router.get('/course-list', isLoggedIn, async (req, res) => {
    const courses = await pool.query('SELECT *FROM courses');
    res.render('Pages/course-type/courses/courses-list', { courses });
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { name } = req.body;
    const newCourse = {
        name
    };
    await pool.query('INSERT INTO courses set ?', [newCourse]);
    req.flash('success', 'Usuario guardado correctamente');
    res.redirect('/course-list');
});

module.exports = router;