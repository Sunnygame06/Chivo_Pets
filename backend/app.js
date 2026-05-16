import express from "express"
import registerUserRoutes from "./src/routes/user.js"
import loginRoutes from "./src/routes/loginUser.js"
import passwordRoutes from "./src/routes/recoveryPassword.js"
import usersRoutes from "./src/routes/users.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());

app.use("/api/register", registerUserRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/user", usersRoutes);

export default app;