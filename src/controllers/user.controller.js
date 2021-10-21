const User = require('../models/user');
const userCtrl = {};

userCtrl.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.json(users);

}

userCtrl.getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
}

userCtrl.deleteUser = async (req, res, next) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({
        status: "usuario eliminado"
    });
}

userCtrl.updateUser = async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
        status: "Usuario Actualizado"
    })
}




module.exports = userCtrl;
