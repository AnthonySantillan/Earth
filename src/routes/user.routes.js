const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const app = express();
const user = require('../controllers/user.controller');

const jwt = require("jsonwebtoken");

router.post('/register', async (req, res) => {
    const { name, lastname, card, email, password } = req.body;
    const newUser = new userModel({ name, lastname, card, email, password });
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).send('email does not exist');
    if (user.password !== password) return res.status(401).send('password error');
    const token = await jwt.sign({ _id: user._id }, 'secretkey');
    res.status(200).json({ token, user });
});

router.get("/users", user.getUsers);

router.get("/users/:id", user.getUser);

router.delete("/users/:id", user.deleteUser);

router.put("/users/:id", user.updateUser);

module.exports = router;