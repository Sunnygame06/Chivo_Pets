import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    phone: {type: String},
    address: {type: String},
    loginAttemps: {type: Number},
    isActive: {type: Boolean}
},{
    timestamps: true,
    strict: false
})

export default model("User", userSchema)