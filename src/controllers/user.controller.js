const User = require('../models/user');
const userCtrl = {};

userCtrl.getUsers = async(req,res,next) =>{
    const users = await User.find();
    res.json(users);

}



module.exports = userCtrl;
