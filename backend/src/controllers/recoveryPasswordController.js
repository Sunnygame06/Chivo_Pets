import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { config } from "../../config.js";

import userModel from "../models/users.js"

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    try{
        const {email} = req.body;

        const userFound = await userModel.findOne({email});

        if(!userFound){
            return res.status(404).json({message: "Correo incorrecto"})
        }

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(
            {email, randomCode, userType: "user", verified: false},
            config.JWT.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Codigo de restablecimiento de contraseña",
            text: "Tu codigo es: " + randomCode
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error"+error)
                return res.status(500).json({message: "Internal Server Error"})
            }
            return res.status(200).json({message: "Exito"})
        })
    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

recoveryPasswordController.verifyCode = async (req, res) => {
    try{
        const {code} = req.body;

        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Error"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, userType: "user", verified: true},
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({message: "Exito"})
    } catch(error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

recoveryPasswordController.newPassword = async (req, res) => {
    try{
        const {newPassword, confirmNewPassword} = req.body;

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Contraseña incorrecta"})
        }

        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(!decoded.verified){
            return res.status(400).json({message: "Error"})
        }

        const passwordHashed = await bcrypt.hash(newPassword, 10)

        await userModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHashed},
            {new: true},
        )

        res.clearCookie("recoveryCookie")

        return res.status(200).json({message: "Exito"})
    } catch(error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default recoveryPasswordController;