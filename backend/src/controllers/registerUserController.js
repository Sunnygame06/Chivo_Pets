import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {config} from "../../config.js";

import userModel from "../models/users.js";
import { text } from "stream/consumers";

const registerUserController = {};

registerUserController.register = async(req, res) => {
    try{
        const {
            name,
            lastName,
            email,
            password,
            phone,
            address,
            isActive
        } = req.body;

        const exitsUser = await userModel.findOne({email});
        if(exitsUser){
            return res.status(400).json({message: "Error"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign({
            randomCode,
            name,
            lastName,
            email,
            password: passwordHashed,
            phone,
            address,
            isActive
            },
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Codigo para restablecer contraseña",
            text: "Este es tu codigo: " + randomCode
        };

        Transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error"+ error)
                return res.status(500).json({message: "Internal Server Error"})
            }
            return res.status(200).json({message: "Email sent"})
        })
    } catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
};

registerUserController.verifyCode = async (req, res) => {
    try{
        const {verificationCodeRequest} = req.body;

        const token = req.cookies.registrationCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            randomCode: storedCode,
            name,
            lastName,
            email,
            password,
            phone,
            address,
            isActive
        } = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Codigo invalido"})
        }

        const newUser = userModel({
            name,
            lastName,
            email,
            password,
            phone,
            address,
            isActive: true
        });

        await newUser.save();

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Exito"})
    } catch (error){
        console.log("error"+ error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default registerUserController;