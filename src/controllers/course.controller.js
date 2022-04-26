const passport = require('passport');
const pool = require('../config/database');


const Course={}

Course.postCourse = async (req, res) => {
    const { name } = req.body;
    const newCourse = {
        name
    };
    await pool.query('INSERT INTO courses set ?', [newCourse]);
    req.flash('success', 'Usuario guardado correctamente');
    res.redirect('/course-list');
};
  
  
Course.getCourses = async (req, res) => {
    const courses = await pool.query('SELECT *FROM courses');
    res.render('Pages/course-type/courses/courses-list', { courses });
};
  



module.exports=Course