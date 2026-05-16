const userController = {};

import usersModel from "../models/users.js";

userController.getUsers = async (req, res) => {
    const users = await usersModel.find();
    res.json(users)
};


userController.deleteUsers = async (req, res) =>{
    await usersModel.findByIdAndDelete(req.params.id)
    res.json({message: "user deleted"})
};

userController.updateUsers = async (req, res) =>{
    const {name, lastName, email, phone, address} = req.body;
    await usersModel.findByIdAndUpdate(req.params.id, {
        name, 
        lastName, 
        email,
        phone, 
        address}, {new: true})

        res.json({message: "user updated"})
};

export default userController;