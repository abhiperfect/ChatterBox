import express from "express";
import { singleAvatar } from "../middleware/multer.js";
import {
  login,
  logout,
  newUser,
  getMyProfile,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express();

app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);
// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);

app.get("/search", searchUser);
app.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);
app.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);
app.get("/notifications", getMyNotifications);

export default app;
