import express from "express";
import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup
} from "../controllers/chat.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
import { attachmentsMulter } from "../middleware/multer.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
app.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);
app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

//SEND ATTACHMENTS
app.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

//GET CHAT DETAILS
app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)


export default app;
