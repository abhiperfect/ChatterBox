import express from "express";
import { singleAvatar } from "../middleware/multer.js";
import { login, logout, newUser } from "../controllers/user.js";
const app = express();

app.post("/new", singleAvatar, newUser);
app.post("/login", singleAvatar, login);

// After here user must be logged in to access the routes
app.get("/logout", logout);

export default app;
