import app from "./app.js";
import "./database.js";

async function main() {
    app.listen(4000)
    console.log("Server port 4000")
}

main()