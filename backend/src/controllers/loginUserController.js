import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import {config} from "../../config.js"

import userModel from "../models/users.js";

const loginUserController = {};

loginUserController.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const userFound = await userModel.findOne({email})

        if(!userFound){
            return res.status(400).json({message: "Usuario no encontrado"})
        }

        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"})
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
            userFound.loginAttemps = (userFound.loginAttemps || 0) + 1

            if(userFound.loginAttemps >= 5){
                userFound.timeOut = Date.now() +1000;
                userFound.loginAttemps = 0;

                await userFound.save();
                return res.status(403).json({message: "Cuenta Bloqueada"})
            }
            await userFound.save();

            return res.status(401).json({message: "Error"})
        }

        userFound.loginAttemps = 0;
        userFound.timeOut = null;

        const token = jsonwebtoken.sign(
            {id: userFound._id, userType: "user"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token);

        return res.status(200).json({message: "Exito"})
    } catch (error){
        console.log("error"+ error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default loginUserController;