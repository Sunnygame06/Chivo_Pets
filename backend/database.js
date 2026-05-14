import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ChivoPets")

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected")
})

connection.on("disconnected", () => {
    console.log("disconnected")
})

connection.on("error", (error) => {
    console.log("Error found" + error)
})