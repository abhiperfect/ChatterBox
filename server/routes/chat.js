import express from "express";
import { newGroupChat } from "../controllers/chat.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

export default app;
