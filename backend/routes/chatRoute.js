import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getChat, getChats, newChat, updateChat } from "../controllers/chatController.js";

const chatRoute = express.Router();

chatRoute.post('/chat', verifyToken, getChat);  // get chat with ID
chatRoute.get('/chats', verifyToken, getChats);  // get all user's chats
chatRoute.post('/new-chat', verifyToken, newChat); // create new-chat
chatRoute.patch('/update-chat', verifyToken, updateChat);  // update chat with ID

export default chatRoute;
