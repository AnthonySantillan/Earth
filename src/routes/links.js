const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const fileUpload = require('express-fileupload');
const { isLoggedIn } = require('../lib/auth');



router.get('/user', (req, res) => {
    res.render('Pages/users/add');
});


router.get('/profile', isLoggedIn,(req, res) => {
    res.render('Pages/user-profile/user-profile');
});

router.post('/user', async (req, res) => {
    const { name, email, description } = req.body;
    const newUser = {
        name,
        email,
        description
    };
    await pool.query('INSERT INTO users set ?', [newUser]);
    req.flash('success', 'Usuario guardado correctamente');
    res.redirect('/links');
});

router.get('/', async (req, res) => {

    const users = await pool.query('SELECT *FROM users');

    //    console.log(users);
    res.render('Pages/users/list', { users });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE ID = ?', [id]);
    req.flash('success', 'Usuario borrado correctamente');

    res.redirect('/links');

});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const users = await pool.query('SELECT *FROM users WHERE id = ?', [id]);
    res.render('Pages/users/edit', { user: users[0] })

});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, description, sampleFile } = req.body;
    const newUser = {
        name,
        email,
        description,
        sampleFile
    };

    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/upload/' + sampleFile.name;
  
    console.log(sampleFile);
  
    // Use mv() to place file on the server

     await pool.query('UPDATE users set ? WHERE id = ?', [newUser, id]);
    req.flash('success', 'Usuario actualizado correctamente');

    res.redirect('/links');

});

router.post('/image-profile', async (req, res) => {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }else{
        res.send('yupi.');
    }
  
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/upload/' + sampleFile.name;
  
    console.log(sampleFile);
  
    // Use mv() to place file on the server

       await pool.query('UPDATE users SET profile_image = ? WHERE id ="1"', [sampleFile.name])

  });
  
      // res.send('File uploaded!');
module.exports = router;