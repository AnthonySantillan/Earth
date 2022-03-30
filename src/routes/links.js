const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const fileUpload = require('express-fileupload');
const { isLoggedIn } = require('../lib/auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');





router.get('/user',isLoggedIn, (req, res) => {
    res.render('Pages/users/add');
});


router.get('/users-services',isLoggedIn,  async (req, res) => {

    const users = await pool.query('SELECT *FROM users');

    res.render('Pages/users/users-services/users-services',{ users });

    
});


router.get('/profile', isLoggedIn, (req, res) => {
    res.render('Pages/user-profile/user-profile');
});

router.post('/user', isLoggedIn, async (req, res) => {
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

router.get('/',isLoggedIn, async (req, res) => {

    const users = await pool.query('SELECT *FROM users');

    //    console.log(users);
    res.render('Pages/users/list', { users });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE ID = ?', [id]);
  
    req.flash('success', 'Usuario borrado correctamente');

    res.redirect('/links');

});

router.get('/edit/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const users = await pool.query('SELECT *FROM users WHERE id = ?', [id]);
    res.render('Pages/users/edit', { user: users[0] })

});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, description } = req.body;
    const newUser = {
        name,
        email,
        description    };

    // Use mv() to place file on the server

    await pool.query('UPDATE users set ? WHERE id = ?', [newUser, id]);
    req.flash('success', 'Usuario actualizado correctamente');

    res.redirect('/links');



});

/* router.post('/image-profile', upload.single('profile_image'), (req, res) => {
    fs.renameSync(req.files.path, req.files.path + '.' + req.files.mimetype.split('/')[1]);
    res.send('Se ha subido');

}); */


router.get('/', isLoggedIn, async (req, res) => {
  const users = await pool.query('SELECT * FROM users WHERE user_id = ?', [req.user.id]);
  res.render('links/list', { users });
});



router.post('/image-profile',isLoggedIn, async (req, res) => {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('message','No Ingresaste una Foto o Imagen')
      return res.status(400).redirect('/profile');
        }
  
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-profile/' + sampleFile.name;
  
    console.log(sampleFile);
  
    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
        pool.query('UPDATE users SET profile_image = ? WHERE id = ?', [sampleFile.name, req.user.id]) 
        req.flash('success', 'Foto de perfil actualizado');
        res.redirect('/profile');
   
      });
  });



// res.send('File uploaded!');
module.exports = router;