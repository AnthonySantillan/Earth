const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('Pages/Dashboard');
});

module.exports = router;