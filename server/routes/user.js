import express from "express";
import { singleAvatar } from "../middleware/multer.js";
import { login, logout, newUser,getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";


const app = express();


app.post("/new", singleAvatar, newUser);
app.post("/login", singleAvatar, login);

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);

export default app;
