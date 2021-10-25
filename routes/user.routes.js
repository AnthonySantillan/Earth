const express = require("express");
const router = express.Router();
const app = express();
const userModel = require('../models/user');

const jwt = require('jsonwebtoken');

const user = require("../controllers/user.controller");

router.post('/signup', async (req, res) => {
	const { email, password, name, lastname } = req.body;
	const newUser = new userModel({ email, password, name, lastname });
	await newUser.save();
	const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
	res.status(200).json({ token });
});

router.post('/signin', async (req, res) => {
	const { email, password, role } = req.body;
	const user = await userModel.findOne({ email });
	if (!user) return res.status(401).send('The email doen\' exists');
	if (user.password !== password) return res.status(401).send('Wrong Password');
	if (user.role === role) return res.status(200).send('Wrong Role');


	const token = jwt.sign({ _id: user._id }, 'secretkey');
	return res.status(200).json({ token, user });
});


router.get("/api/users", user.getUsers);

router.post("/api/users", user.createUser);

router.get("/api/users/:id", user.getUser);

router.put("/api/users/:id", user.editUser);

router.delete("/api/users/:id", user.deleteUser);


async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch (e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
