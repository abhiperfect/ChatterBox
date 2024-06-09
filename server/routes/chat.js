import express from "express";
import { newGroupChat, getMyChats,getMyGroups } from "../controllers/chat.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);


export default app;
