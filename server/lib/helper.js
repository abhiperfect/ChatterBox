import { userSocketIDs } from "../index.js";

export const getOtherMember = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());

export const getSockets = (users = []) => {
  // Optional logging for debugging
  // console.log("users: ", users);
  // console.log("userSocketsID", userSocketIDs);

  const sockets = users.map((user) => {
    // Extract the user ID from the user object (assuming it's an object with an _id property)
    const userId = user._id;
    return userSocketIDs.get(userId);
  });

  // console.log("sockets: ", sockets);
  return sockets;
};

export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;