const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

const pool = require('../config/database');

router.get('/course-list', isLoggedIn, async (req, res) => {
    const courses = await pool.query('SELECT *FROM courses');
    res.render('Pages/course-type/courses/courses-list', { courses });
});

router.get('/add-course', isLoggedIn, (req, res) => {
    res.render('Pages/course-type/courses/courses-add');
});

router.post('/add-course', isLoggedIn, async (req, res) => {
    const { name } = req.body;
    const newCourse = {
        name
    };
    await pool.query('INSERT INTO courses set ?', [newCourse]);
    req.flash('success', 'Usuario guardado correctamente');
    res.redirect('/course-list');
});

router.get('/', isLoggedIn, async (req, res) => {
    const users = await pool.query('SELECT * FROM users WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { users });
});



router.post('/video/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('message', 'No Ingresaste un video')
        return res.status(400).redirect('/course-list');
    }

    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/videos/videos-courses/' + sampleFile.name;

    console.log(sampleFile);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE courses SET video = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Foto de perfil actualizado');
        res.redirect('/course-list');

    });
});

module.exports = router;